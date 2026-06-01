document.getElementById(''year'').textContent = new Date().getFullYear();

const mdMap = {
  about: 'content/about.md',
  projects: 'content/projects.md',
  resume: 'content/resume.md',
  contact: 'content/contact.md'
};

async function loadMD(sectionId, path){
  try{
    const res = await fetch(path);
    if(!res.ok) throw new Error('Failed');
    const md = await res.text();
    const html = marked.parse(md);
    document.querySelector('#'+sectionId+' .md-content').innerHTML = html;
  }catch(e){
    document.querySelector('#'+sectionId+' .md-content').textContent = 'Content not available.';
  }
}

Object.entries(mdMap).forEach(([id,p])=>loadMD(id,p));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  });
});
