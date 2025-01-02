jQuery(document).ready(function($) {
    $('#upload-avatar-btn').click(function(e) {
        e.preventDefault();
        
        var image = wp.media({
            title: 'Upload Avatar',
            multiple: false
        }).open()
        .on('select', function() {
            var uploaded_image = image.state().get('selection').first();
            var image_url = uploaded_image.toJSON().url;
            
            $('#jenny-avatar-preview').attr('src', image_url);
            $('#jenny_ai_chat_avatar').val(image_url);
        });
    });
});