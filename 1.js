document.addEventListener("DOMContentLoaded", () => {
    const postButton = document.getElementById("post-button");
    const postText = document.getElementById("post-text");
    const postsList = document.getElementById("posts");

    // Retrieve posts from local storage
    let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

    // Function to update the list of posts
    function updatePosts() {
        postsList.innerHTML = "";
        savedPosts.forEach((post, index) => {
            const postItem = document.createElement("li");
            postItem.className = "post";
            postItem.textContent = post.content;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", () => {
                savedPosts.splice(index, 1);
                localStorage.setItem("posts", JSON.stringify(savedPosts));
                updatePosts();
            });

            postItem.appendChild(deleteButton);
            postsList.appendChild(postItem);
        });
    }

    updatePosts();

    postButton.addEventListener("click", () => {
        const text = postText.value.trim();

        if (text !== "") {
            const newPost = {
                content: text,
                timestamp: new Date().toISOString(),
            };

            savedPosts.push(newPost);
            localStorage.setItem("posts", JSON.stringify(savedPosts));

            postText.value = "";

            updatePosts();
        }
    });
});
