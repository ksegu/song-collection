function search() {
    $("#search").on('keyup', function () {
        var count = $(".song").length
       $(".song").each(function(index) {
            if (!$(this).text().toUpperCase().includes($("#search").val().toUpperCase())) {
                $(this).hide()
                count--
            }
            else {
                $(this).show()
                count++
            }
            if (count == 0) {
               $('#searchFail').show()
            }
            else {
                $("#searchFail").hide()
            }
       })
    })
}


$(document).ready(function() {
    search();
})
