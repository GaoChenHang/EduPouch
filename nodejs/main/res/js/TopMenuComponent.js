class MenuComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const token = !!window.localStorage.getItem('token');
      this.shadowRoot.innerHTML = `
      <style>
        #menu {
          width: 100%;
          height: 50px;      
          border-radius: 10px;  
          background-color:blue;               
        }
        #menu ul {
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;      
          display: flex;
          align-items: center;
        }
        
        #menu ul li, #menu ul li a {
          float: left;
          width: 100px; 
          text-align: center;
          color: white;
          font-size: 18px;
        }
      </style>
      <div id="menu">
        <ul>
          <li><a href="/words">单词</a></li>
          <li>错题</li>
        </ul>    
      </div>
    `;
  }
}

customElements.define('menu-component', MenuComponent);