// Select the form element
const commentForm = document.querySelector('.comments__comment-form');

// Select the appointment list element
const commentListElement = document.querySelector('.comments__comments-list');

const comments = [
    { name: "Victor Pinto", timestamp: "11/02/2023", text: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains." },
    { name: "Christina Cabrera", timestamp: "10/28/2023", text: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day." },
    { name: "Isaac Tadesse", timestamp: "10/20/2023", text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough." }
];

commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = e.target.nameId.value;
    const text = e.target.commentId.value;

    // this generates a Unix timestamp
    const currTimestamp = Date.now();
    const currDate = new Date(currTimestamp);

    // mm/dd/yyyy
    const month = currDate.getMonth();
    const date = currDate.getDate();
    const year = currDate.getFullYear();

    const timestamp = `${month}/${date}/${year}`;

    const newComment = {
        name,
        text,
        timestamp,
    }

    comments.unshift(newComment);
    renderCommentsList();
});

function createComment(commentObj) {
    // create element for the comment item
    const commentItemEl = document.createElement("div");
    commentItemEl.classList.add("comments__comment-item");

    const commentAvatarEl = document.createElement("div");
    commentAvatarEl.classList.add("comments__comment-avatar");

    const commentSectionEl = document.createElement("div");
    commentSectionEl.classList.add("comments__comment-section");

    commentItemEl.appendChild(commentAvatarEl);
    commentItemEl.appendChild(commentSectionEl);

    const commentHeaderEl = document.createElement("div");
    commentHeaderEl.classList.add("comments__comment-header");

    const commentContentEl = document.createElement("div");
    commentContentEl.classList.add("comments__comment-content");
    commentContentEl.innerText = commentObj.text;

    commentSectionEl.appendChild(commentHeaderEl);
    commentSectionEl.appendChild(commentContentEl);

    const commentHeaderNameEl = document.createElement("h3");
    commentHeaderNameEl.classList.add("comments__comment-header-name");
    commentHeaderNameEl.innerText = commentObj.name;

    const commentHeaderTimestampEl = document.createElement("div");
    commentHeaderTimestampEl.classList.add("comments__comment-header-timestamp");
    commentHeaderTimestampEl.innerText = commentObj.timestamp;

    commentHeaderEl.appendChild(commentHeaderNameEl);
    commentHeaderEl.appendChild(commentHeaderTimestampEl);

    commentListElement.appendChild(commentItemEl);
}

function createDivider() {
    const divider = document.createElement("div");
    divider.classList.add("divider");
    commentListElement.appendChild(divider);
}

function renderCommentsList() {
    while (commentListElement.firstChild) {
        commentListElement.removeChild(commentListElement.firstChild);
    }
    createDivider();
    comments.forEach(comment => {
        createComment(comment);
        createDivider();
    });
}

renderCommentsList();