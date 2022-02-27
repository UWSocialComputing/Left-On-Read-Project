const banner_entry_point = document.createElement('div');
let reactJS_script = document.createElement('script');

banner_entry_point.id = 'banner';
reactJS_script.src = 'banner.bundle.js';

banner_entry_point.appendChild(reactJS_script);

document.querySelector("body").appendChild(banner_entry_point);