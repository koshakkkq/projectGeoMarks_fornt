function add_chechkboxes(){

    $.ajax({
        url: "http://188.120.227.130/get_active_markers",
        success: function (data) {
            data = JSON.parse(data)
            for (let i = 0; i < data.length; i++){
                let add = '<div> <input type="checkbox" value="?"><label> 188.188.188.0</label> </div>'
                add = add.replace('?', data[i]['id'])
                $('#trackers_fields').append(add)
            }

        },

    })

}

function redirect_to_map(){
    let params = ''
    $('form :input[type=checkbox]').each( function (){
        let input = $(this);
        if (input.is(':checked')) {
            if (params.length === 0){
                params+='id[]='+input.val();
            } else{
                params+='&id[]='+input.val();

            }
        }
    })
    window.location = "map.html?"+params;
}