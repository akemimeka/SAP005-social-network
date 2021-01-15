export const Footer = () => {
  const githubFooter = document.createElement('footer');
  githubFooter.classList.add('github-footer');

  githubFooter.innerHTML = `
    <p>
      <i class="github-icon fab fa-github-alt"></i> Desenvolvido por
    </p>
    <p>
      <a class="link-footer" href="https://github.com/akemimeka" target="_blank" rel="noopener noreferrer">Akemi Mitsueda</a>,  
      <a class="link-footer" href="https://github.com/CarolineSCosta" target="_blank" rel="noopener noreferrer">Caroline Costa</a> e  
      <a class="link-footer" href="https://github.com/JessicaCavalcante" target="_blank" rel="noopener noreferrer">Jessica&nbsp;Cavalcante</a>
    </p>
  `;
  return githubFooter;
};
