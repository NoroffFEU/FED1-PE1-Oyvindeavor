import { doFetch } from "./utils/doFetch.mjs";
import { updateUI } from "./utils/updateUi.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});

function registerForm() {
  const bio = document.getElementById("bio");
  const profilePic = document.getElementById("profile-picture");
  const name = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitButton = document.getElementById("registerbutton");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await doFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          bio: bio.value,
          avatar: {
            url: profilePic.value,
          },
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering");
    }
  });
}

function profilePicPreview() {
  const profilePic = document.getElementById("profile-picture");
  const profilePicPreview = document.getElementById("profile-picture-preview");

  profilePic.addEventListener("input", () => {
    profilePicPreview.src = profilePic.value;
  });
}
profilePicPreview();











// async function deleteBlogPost(id) {
//   try {
//     const response = await doFetch(`/blog/posts/oyvind/${id}`, {
//       method: "DELETE",
//       headers: {
//         authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     alert("Error deleting post");
//   }
// }

// deleteBlogPost("c15a7e0c-8aac-403b-bd84-253cbf5c091e");