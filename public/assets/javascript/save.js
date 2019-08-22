$(document).ready(function(){
    $(document).on("click", ".save", saveArticle);
    function saveArticle(){
        console.log("saving the article");
        $.post("/api/save").then(function(data){
            console.log("saved article");
        })
    }
})