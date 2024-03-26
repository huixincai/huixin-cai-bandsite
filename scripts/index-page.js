// Select the form element
const commentForm = document.querySelector(".comments__comment-form");

// Select the appointment list element
const commentListElement = document.querySelector(".comments__comments-list");

const apiKey = "854cd8c6-8cf9-4ba9-bc5d-4230f7932efb";
const baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";

const bandSiteApi = new BandSiteApi(apiKey, baseUrl);

function timestampToMMDDYYYY(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.nameId.value;
  const comment = e.target.commentId.value;

  const newComment = {
    name,
    comment,
  };

  await bandSiteApi.postComment(newComment);
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
  commentContentEl.innerText = commentObj.comment;

  commentSectionEl.appendChild(commentHeaderEl);
  commentSectionEl.appendChild(commentContentEl);

  const commentHeaderNameEl = document.createElement("h3");
  commentHeaderNameEl.classList.add("comments__comment-header-name");
  commentHeaderNameEl.innerText = commentObj.name;

  const commentHeaderTimestampEl = document.createElement("div");
  commentHeaderTimestampEl.classList.add("comments__comment-header-timestamp");
  commentHeaderTimestampEl.innerText = timestampToMMDDYYYY(
    commentObj.timestamp
  );

  commentHeaderEl.appendChild(commentHeaderNameEl);
  commentHeaderEl.appendChild(commentHeaderTimestampEl);

  commentListElement.appendChild(commentItemEl);
}

function createDivider() {
  const divider = document.createElement("div");
  divider.classList.add("divider");
  commentListElement.appendChild(divider);
}

async function renderCommentsList() {
  const comments = await bandSiteApi.getComments();
  while (commentListElement.firstChild) {
    commentListElement.removeChild(commentListElement.firstChild);
  }
  createDivider();
  comments.forEach((comment) => {
    createComment(comment);
    createDivider();
  });
}

renderCommentsList();
