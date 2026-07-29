(function(){
  const DEFAULT_CONFIG = {
    // Static-site friendly placeholder. Set this to a Google Apps Script / CRM / API endpoint later.
    // Example: backendEndpoint: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'
    backendEndpoint: 'https://script.google.com/macros/s/AKfycbzE033lAqetDNby9KxCOI2d-GwYqkDQKNmyu9pSYnXNcqryeZZ7tux5l9LiaHBq9VfZ/exec',
    storageKey: 'neogennie_contact_leads',
    localFallbackOnly: true
  };

  const config = Object.assign({}, DEFAULT_CONFIG, window.NEOGENNIE_LEAD_CAPTURE_CONFIG || {});

  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function setStatus(form, type, message){
    const node = form.querySelector('[data-lead-capture-status]');
    if(!node) return;
    node.hidden = false;
    node.className = 'ng-form-status ' + type;
    node.textContent = message;
  }

  function revealDownload(form){
    const panel = form.querySelector('[data-lead-magnet-success]') || document.querySelector('[data-lead-magnet-success]');
    if(panel){
      panel.hidden = false;
      panel.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
  }

  function revealDiscoveryCall(form){
    const panel = form.querySelector('[data-discovery-call-cta]');
    if(panel){
      panel.hidden = false;
      panel.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
  }

  function revealGetStartedSuccessResource(form){
    const panel = form.querySelector('[data-get-started-success-resource]');
    if(panel){
      panel.hidden = false;
    }
  }

  function revealDiscoveryCallConfirmation(form){
    const panel = form.querySelector('[data-discovery-call-confirmation]');
    if(panel){
      panel.hidden = false;
      panel.scrollIntoView({behavior:'smooth', block:'nearest'});
    }
  }

  function hideElement(node){
    if(!node) return;
    node.hidden = true;
    node.setAttribute('hidden', '');
    node.style.display = 'none';
  }

  function showGetStartedSuccessState(form){
    const fields = form.querySelector('.lead-form-grid');
    const note = form.querySelector('.form-required-note');
    const button = form.querySelector('button[type="submit"]');
    hideElement(fields);
    hideElement(note);
    hideElement(button);
    revealGetStartedSuccessResource(form);
    revealDiscoveryCall(form);
  }

  function payloadFromForm(form){
    const timestamp = new Date().toISOString();
    const sourcePage = window.location.href;
    const sourceInput = form.querySelector('[name="source_page"]');
    const timestampInput = form.querySelector('[name="timestamp"]');
    if(sourceInput) sourceInput.value = sourcePage;
    if(timestampInput) timestampInput.value = timestamp;
    const data = new FormData(form);
    return {
      fullName: String(data.get('full_name') || '').trim(),
      workEmail: String(data.get('work_email') || '').trim(),
      company: String(data.get('company') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      productInterest: String(data.get('product_interest') || '').trim(),
      message: String(data.get('message') || '').trim(),
      consent: data.get('consent') === 'yes',
      sourcePage,
      timestamp,
      source: String(data.get('source') || form.dataset.leadSource || 'website_get_started_form').trim(),
      leadMagnet: String(data.get('lead_magnet') || form.dataset.leadMagnet || '').trim(),
      biggestConcern: String(data.get('biggest_concern') || '').trim(),
      businessType: String(data.get('business_type') || '').trim()
    };
  }

  function saveLocal(payload, storageKey){
    const key = storageKey || config.storageKey;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(payload);
    localStorage.setItem(key, JSON.stringify(existing.slice(-50)));
  }

  function appsScriptFormBody(payload){
    const params = new URLSearchParams();
    const add = (key, value) => params.append(key, value === undefined || value === null ? '' : String(value));
    add('source', payload.source);
    add('leadSource', payload.source);
    add('source_type', payload.source);
    add('sourcePage', payload.sourcePage);
    add('source_page', payload.sourcePage);
    add('timestamp', payload.timestamp);
    add('fullName', payload.fullName);
    add('full_name', payload.fullName);
    add('name', payload.fullName);
    add('workEmail', payload.workEmail);
    add('work_email', payload.workEmail);
    add('email', payload.workEmail);
    add('company', payload.company);
    add('business', payload.company);
    add('phone', payload.phone);
    add('productInterest', payload.productInterest);
    add('product_interest', payload.productInterest);
    add('leadMagnet', payload.leadMagnet);
    add('lead_magnet', payload.leadMagnet);
    add('businessType', payload.businessType);
    add('business_type', payload.businessType);
    add('biggestConcern', payload.biggestConcern);
    add('biggest_concern', payload.biggestConcern);
    add('message', payload.message);
    add('consent', payload.consent ? 'yes' : 'no');
    return params;
  }

  async function submitLead(form, payload){
    const endpoint = (form.dataset.leadCaptureEndpoint || config.backendEndpoint || '').trim();
    const storageKey = form.dataset.leadCaptureStorageKey || config.storageKey;
    if(!endpoint){
      saveLocal(payload, storageKey);
      return {mode:'local', ok:true};
    }
    const body = JSON.stringify(payload);
    const isGoogleAppsScript = /script\.google\.com\/macros\/s\//i.test(endpoint);
    if(isGoogleAppsScript){
      // Google Apps Script Web Apps do not expose custom CORS headers through ContentService.
      // Use a simple no-cors form-encoded POST so the browser can send the lead without requiring a CORS-readable response.
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},
        body: appsScriptFormBody(payload)
      });
      return {mode:'remote', ok:true, opaque:true};
    }
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body
    });
    if(!res.ok) throw new Error('Lead endpoint returned HTTP ' + res.status);
    return {mode:'remote', ok:true};
  }

  function attach(form){
    const discoveryLink = form.querySelector('[data-discovery-call-link]');
    if(discoveryLink){
      discoveryLink.addEventListener('click', function(){
        window.setTimeout(function(){ revealDiscoveryCallConfirmation(form); }, 300);
      });
    }

    form.addEventListener('submit', async function(event){
      event.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        setStatus(form, 'error', 'Please complete the required fields and acknowledge the Privacy Policy and Terms before submitting.');
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      const previousText = button ? button.textContent : '';
      const isLeadMagnet = Boolean(form.dataset.leadMagnet || form.querySelector('[name="lead_magnet"]'));
      if(button){ button.disabled = true; button.textContent = 'Submitting...'; }
      const payload = payloadFromForm(form);
      try{
        const result = await submitLead(form, payload);
        if(isLeadMagnet){
          revealDownload(form);
          if(result.mode === 'remote'){
            setStatus(form, 'success', 'Thank you — your guide is ready below. We also captured your request so NeoGennie can follow up if relevant.');
            form.reset();
          } else {
            setStatus(form, 'warning', 'Thanks — your guide is ready below. For this local/static preview, your details were saved locally for testing because the backend endpoint is not configured yet.');
          }
        } else if(result.mode === 'remote'){
          setStatus(form, 'success', 'You’re all set — your request has been received. We’ll review your details and follow up with the best next step for your NeoGennie AI agent path.');
          form.reset();
          showGetStartedSuccessState(form);
        } else {
          setStatus(form, 'warning', 'Thanks — your details were saved locally for testing. The backend endpoint is not configured yet, so this request was not sent to the NeoGennie team.');
        }
      } catch(error){
        try{ saveLocal(payload, form.dataset.leadCaptureStorageKey || config.storageKey); }catch(e){}
        if(isLeadMagnet){
          revealDownload(form);
          setStatus(form, 'warning', 'Your guide is ready below. We could not reach the lead-capture backend, so your details were saved locally for testing only.');
        } else {
          setStatus(form, 'error', 'We could not reach the lead-capture backend. Your details were saved locally for testing, but this request was not sent. Please try again later or email info@neogennie.com.');
        }
      } finally {
        if(button){ button.disabled = false; button.textContent = previousText || 'Submit request'; }
      }
    });
  }

  ready(function(){
    document.querySelectorAll('[data-lead-capture-form]').forEach(attach);
  });
})();
