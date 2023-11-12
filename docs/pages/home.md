## Welcome to My Website

Hello and thank you for visiting my personal website. My name is Brian Mulwa and I am a freelance web developer and
designer. I created this website to showcase some of my projects and skills, as well as to share some of my thoughts and
opinions on various topics related to web development at technology in general. On this website, you can find my portfolio, blog, resume, contact
information and more. I hope you enjoy browsing through my work and learning more about me. If you have any questions or
feedback, please feel free to reach out to me via email or social media. I would love to hear from you and collaborate
with you on your next project.

### Explore

<div class="d-flex justify-content-center">
    <div class="col d-flex justify-content-center home">
        <md-block>
            [![About](../../assets/img/icons/icons8-info.svg)About](#about)[![Resume](../../assets/img/icons/icons8-document.svg)Resume](#resume)[![Contact](../../assets/img/icons/icons8-contacts.svg)Contact](#contact)[![Blog](../../assets/img/icons/icons8-blogger.svg)Blog](#Blog)[![GitHub](../../assets/img/icons/icons8-github.svg)The code - GitHub](https://github.com/HorizonsMW/markdown-site.git)[![News](../../assets/img/icons/icons8-news.svg)News](#news)                   
        </md-block>
    </div>
</div>

---

#### Updates

<div class="d-grid d-md-flex">
     <div class="col d-grid d-md-flex align-items-center home">
        <button id="done" class="p-3 text-light rounded-circle m-0 border-0 d-none d-md-block" onclick="nextUpdate()"> <img src="./assets/img/icons/icons8-back-to-100.png" alt="previous-page" width="40px"></button>
        <div class="col w-100  update">
            <h5 id="title">title</h5>
            <p id="updateDate">date</p>
            <p id="update">update</p> 
            <div id="link" class="d-flex align-items-center p-2 h-auto"></div> 
        </div>
        <button id="done" class="p-3 rounded-circle text-light m-0 border-0 d-none d-md-block" onclick="prevUpdate()"><img src="./assets/img/icons/icons8-next-page-100.png" alt="next-page" width="40px" ></button>
        <div class="d-flex justify-content-center">
            <button id="done" class="p-0 text-light rounded-circle m-1 border-0 d-md-none" onclick="nextUpdate()"> <img src="./assets/img/icons/icons8-back-to-100.png" alt="previous-page" width="40px"></button>
            <button id="done" class="p-0 rounded-circle text-light m-1 border-0 d-md-none" onclick="prevUpdate()"> <img src="./assets/img/icons/icons8-next-page-100.png" alt="next-page" width="40px" ></button>
        </div>
    </div>  
</div>

---

#### Say Something

<div class="d-grid m-2">
    <div class="col d-flex justify-content-center m-0 p-2 input">
     <input class="rounded-3 p-2" type="text" id="name" name="name" required minlength="4" maxlength="20" size="10" placeholder="Your name">
    </div>
    <div class="col d-flex justify-content-center m-0 p-2 input">
      <textarea class="rounded-3 p-2" type="text" id="message" name="message" required minlength="10" size="12" placeholder="Your message"></textarea>
    </div>
     <div class="col d-flex justify-content-center m-2 p-2 home">
        <button id="done" class="bg-success rounded-pill border-0 px-5 py-2 bg-opacity-75 text-light m-2" onclick="sendMessage()">Done</button>
    </div>
   
</div>
