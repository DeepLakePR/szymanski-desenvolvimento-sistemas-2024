$(()=>{

    // Modal
    const MainModal = $('body div.modalExtendedPhoto');
    const ModalContainer = MainModal.find('.modalExtPhotoContainer');

    const ModalCloseButton = ModalContainer.find('.modalCloseButton');

    const ModalImage = ModalContainer.find('img');

    const ElencoImagesExtendedPhoto = $('body img[isExtendedImage]');

    // Set Click Style On Images
    ElencoImagesExtendedPhoto.each((_, image)=>{

        $(image).css('cursor', 'pointer');

        $(image).click(()=>{
            OpenModal($(image).attr('src'));

        });

    })

    // Open Modal
    function OpenModal(imageToLoad){

        imageToLoad = imageToLoad.split('/')
        imageToLoad = `${imageToLoad[0]}/${imageToLoad[1]}/${imageToLoad[2]}/${imageToLoad[3]}/${imageToLoad[4].split('.')[0]}-real.jpeg`;

        ModalImage.attr('src', imageToLoad);

        MainModal.fadeIn();
        MainModal.css('display', 'flex');

    }

    // Close Modal
    function CloseModal(){

        MainModal.fadeOut(()=>{
            MainModal.css('display', 'none');

        });

    }

    // Event Listener
    ModalCloseButton.click(CloseModal);

    $(document).click((e) => {

        e.stopPropagation();

        if ($(e.target).is(MainModal)) {
            CloseModal();

        }

    })

})
