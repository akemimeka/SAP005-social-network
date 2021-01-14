export const Footer = () => {
  const githubFooter = document.createElement('footer');
  githubFooter.setAttribute('id', 'github-footer');

  githubFooter.innerHTML = `
    <span>
    <i id="github-icon" class="fab fa-github-alt"></i> Developed by 
    <a class="link-footer" href="https://github.com/akemimeka" target="_blank" rel="noopener noreferrer">©Akemi Mitsueda</a> 
    <a class="link-footer" href="https://github.com/CarolineSCosta" target="_blank" rel="noopener noreferrer">©CarolineCosta</a> 
    <a class="link-footer" href="https://github.com/JessicaCavalcante" target="_blank" rel="noopener noreferrer">©Jessica Cavalcante</a>
    </span>
  `;
  return githubFooter;
};
