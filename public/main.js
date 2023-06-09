const contentDiv = document.querySelector(".content")
const form = document.querySelector("form");
const urlInput = document.querySelector("#long-url");

form.onsubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post("/api/url/shorten", {
            longUrl: urlInput.value
        });
        if (data.shortUrl) {
            contentDiv.innerHTML = `<p>Here is your short URL:</p>
            <div class="box">
                <a href="${data.shortUrl}">${data.shortUrl}</a>
                <i class="fa-regular fa-copy"></i>
            </div>
            <div class="qr-box">
                <img src="/api/url/image/${data.shortId}">
            </div>`
        }
    } catch (error) {
        console.log(error);
    }
}