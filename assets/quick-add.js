if (!customElements.get('quick-add-modal')) {
  customElements.define(
    'quick-add-modal',
    class QuickAddModal extends ModalDialog {
      constructor() {
        super();
        this.modalContent = this.querySelector('[id^="QuickAddInfo-"]');

        this.addEventListener('product-info:loaded', ({ target }) => {
          target.addPreProcessCallback(this.preprocessHTML.bind(this));
        });
      }

      hide(preventFocus = false) {
        const cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        if (cartNotification) cartNotification.setActiveElement(this.openedBy);
        this.modalContent.innerHTML = '';

        if (preventFocus) this.openedBy = null;
        super.hide();
      }

      show(opener) {
        opener.setAttribute('aria-disabled', true);
        opener.classList.add('loading');
        opener.querySelector('.loading__spinner').classList.remove('hidden');

        fetch(opener.getAttribute('data-product-url'))
          .then((response) => response.text())
          .then((responseText) => {
            const responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
            const productElement = responseHTML.querySelector('product-info');

            this.preprocessHTML(productElement);
            HTMLUpdateUtility.setInnerHTML(this.modalContent, productElement.outerHTML);

            if (window.Shopify && Shopify.PaymentButton) {
              Shopify.PaymentButton.init();
            }
            if (window.ProductModel) window.ProductModel.loadShopifyXR();

            super.show(opener);






const div = document.querySelector('.product__info-wrapper');
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-variant') {
      const oldValue = mutation.oldValue;
      const newValue = div.dataset.variant;
      console.log('data-variant changed:', { oldValue, newValue });
      // Your handler code here
      validateFields();
      document.querySelector(".product__info-wrapper .error-msg").classList.add("hidden");
          const sides2 = ["Top", "Bottom", "Left", "Right"];
          sides2.forEach(side => {
               document.querySelector(`#custom_size_${side}`).dispatchEvent(new Event('input', { bubbles: true }));
          });

    }
  });
});

observer.observe(div, {
  attributes: true,
  attributeFilter: ['data-variant'], // Only watch data-variant attribute
  attributeOldValue: true // Include old value in mutation record
});
  

    // Sync radio buttons
    const visibleRadios = document.querySelectorAll('input[name="fake_cassette_mounted"]');
    const hiddenRadios = document.querySelectorAll('input[name="properties[Cassette Mounted]"]');
    if (visibleRadios){
      visibleRadios.forEach(radio => {
        radio.addEventListener("change", function () {
          hiddenRadios.forEach(hiddenRadio => {
            hiddenRadio.checked = hiddenRadio.value === radio.value;
          });
        });
      });
    }



    // Sync number inputs
    const sides = ["Top", "Bottom", "Left", "Right"];
    console.log("hi");
    sides.forEach(side => {
      const visibleInput = document.querySelector(`#custom_size_${side}`);
      const hiddenInput = document.querySelector(`input[name="properties[${side}]"]`);
      visibleInput.addEventListener("input", function () {
        if (this.value){
          this.value = this.value.replace(/\D/g, ''); // remove non-digits
          const value = parseFloat(this.value);
          let min = 0;
          let max = 2400
          if (this.classList.contains("width_input")  ){
              max =  Number(document.querySelector('.product__info-wrapper').dataset.vwidth);
          }else{
              max =  Number(document.querySelector('.product__info-wrapper').dataset.vheight);

          }



          if (isNaN(value) || value < min ){
            document.querySelector(".product__info-wrapper .error-msg-mm").classList.remove("hidden")

          } else if(value > max) {
            this.classList.add('input-error');
            document.querySelector(".product__info-wrapper .max-width-msg").innerText = document.querySelector('.product__info-wrapper').dataset.vwidth
            document.querySelector(".product__info-wrapper .max-height-msg").innerText = document.querySelector('.product__info-wrapper').dataset.vheight
            document.querySelector(".product__info-wrapper .error-msg").classList.remove("hidden")
            this.classList.add('input-error');

          } else {
            this.classList.remove('input-error');
            document.querySelector(".product__info-wrapper .error-msg").classList.add("hidden")
            document.querySelector(".product__info-wrapper .error-msg-mm").classList.add("hidden")
            hiddenInput.value = visibleInput.value;
          }          
        }


      });
    });



   // Select the "No" radio by its value (you can also use its id if unique)
    const cuttingServiceRadios = document.querySelectorAll('.product-form-Cutting input[name*="Cutting Service-"]');
    const container = document.querySelector('.product__info-wrapper ');
    if (cuttingServiceRadios){
      cuttingServiceRadios.forEach(radio => {
        radio.addEventListener("change", function () {
          if (radio.value === "No" && radio.checked) {
            // Clear all visible number inputs
            console.log("lol")
            document.querySelectorAll('input[type="number"]').forEach(input => {
              input.value = "";
            });
              document.querySelector('.error-msg').classList.remove("hidden");
              document.querySelector(".radio-error-msg").classList.remove("hidden")

            // Uncheck all  fake custom fields
            document.querySelectorAll('input[type="radio"][name="fake_cassette_mounted"]')?.forEach(input => {
              input.checked = false;
            });
            // Uncheck all  hidden custom fields
            document.querySelectorAll('input[type="radio"][name="properties[Cassette Mounted]"]')?.forEach(input => {
              input.checked = false;
            });

            container.classList.remove("all-entered");
          }
        });
      });
    }

    // add all-entered class
    const widthNumberInputs = container.querySelectorAll('.custom-properties-fields  input[type="number"].width_input');
    const heightNumberInputs = container.querySelectorAll('.custom-properties-fields  input[type="number"].height_input');
    const radioInputs = container.querySelectorAll('input[type="radio"][name="fake_cassette_mounted"]');

    function validateFields() {
      let allValid = true;
      widthNumberInputs.forEach(input => {
        const value = input.value.trim();
        const number = parseFloat(value);
        const currentMax = Number(document.querySelector('.product__info-wrapper').dataset.vwidth);
        if (
          value === '' || 
          isNaN(number) || 
          number < 0 || 
          number > currentMax
        ) {
          allValid = false;
        }else{
          input.classList.remove("input-error");
        }
      });

      heightNumberInputs.forEach(input => {
        const value = input.value.trim();
        const number = parseFloat(value);
        const currentMax = Number(document.querySelector('.product__info-wrapper').dataset.vheight);

        if (
          value === '' || 
          isNaN(number) || 
          number < 0 || 
          number > currentMax
        ) {
          allValid = false;
        }
      });

      if (radioInputs.length>0){
        const oneRadioChecked = Array.from(radioInputs).some(r => r.checked);
        if (!oneRadioChecked) {
          allValid = false;
        }else{
          document.querySelector('.radio-error-msg').classList.add("hidden");

        }
        // Listen for changes on radio buttons
        radioInputs.forEach(radio => {
          radio.addEventListener('change', validateFields);
        });
      }


      if (allValid) {
        container.classList.add('all-entered');
      } else {
        container.classList.remove('all-entered');
      }
    }

    document.querySelector('.product__info-wrapper .product-form__buttons').addEventListener('mouseover', function (){
      console.log("lol")
      let allEntered = document.querySelector('.product__info-wrapper').classList.contains("all-entered");
      let cutting = document.querySelector('.product__info-wrapper').dataset.variant.includes("Yes");
      if (!allEntered && cutting){
              const radioInputs = container.querySelectorAll('input[type="radio"][name="fake_cassette_mounted"]');
      if (radioInputs.length>0){
        const oneRadioChecked = Array.from(radioInputs).some(r => r.checked);
        if (!oneRadioChecked) {
          document.querySelector('.radio-error-msg').classList.remove("hidden");

        }else{
          document.querySelector('.radio-error-msg').classList.add("hidden");

        }
      }
      }

    })

    // Listen for changes on number inputs
    widthNumberInputs.forEach(input => {
      input.addEventListener('input', validateFields);
    });
    // Listen for changes on number inputs
    heightNumberInputs.forEach(input => {
      input.addEventListener('input', validateFields);
    });

    // Initial check (if values are pre-filled)
    validateFields();













          })
          .finally(() => {
            opener.removeAttribute('aria-disabled');
            opener.classList.remove('loading');
            opener.querySelector('.loading__spinner').classList.add('hidden');
          });
      }

      preprocessHTML(productElement) {
        productElement.classList.forEach((classApplied) => {
          if (classApplied.startsWith('color-') || classApplied === 'gradient')
            this.modalContent.classList.add(classApplied);
        });
        this.preventDuplicatedIDs(productElement);
        this.removeDOMElements(productElement);
        this.removeGalleryListSemantic(productElement);
        this.updateImageSizes(productElement);
        this.preventVariantURLSwitching(productElement);
      }

      preventVariantURLSwitching(productElement) {
        productElement.setAttribute('data-update-url', 'false');
      }

      removeDOMElements(productElement) {
        const pickupAvailability = productElement.querySelector('pickup-availability');
        if (pickupAvailability) pickupAvailability.remove();

        const productModal = productElement.querySelector('product-modal');
        if (productModal) productModal.remove();

        const modalDialog = productElement.querySelectorAll('modal-dialog');
        if (modalDialog) modalDialog.forEach((modal) => modal.remove());
      }

      preventDuplicatedIDs(productElement) {
        const sectionId = productElement.dataset.section;

        const oldId = sectionId;
        const newId = `quickadd-${sectionId}`;
        productElement.innerHTML = productElement.innerHTML.replaceAll(oldId, newId);
        Array.from(productElement.attributes).forEach((attribute) => {
          if (attribute.value.includes(oldId)) {
            productElement.setAttribute(attribute.name, attribute.value.replace(oldId, newId));
          }
        });

        productElement.dataset.originalSection = sectionId;
      }

      removeGalleryListSemantic(productElement) {
        const galleryList = productElement.querySelector('[id^="Slider-Gallery"]');
        if (!galleryList) return;

        galleryList.setAttribute('role', 'presentation');
        galleryList.querySelectorAll('[id^="Slide-"]').forEach((li) => li.setAttribute('role', 'presentation'));
      }

      updateImageSizes(productElement) {
        const product = productElement.querySelector('.product');
        const desktopColumns = product?.classList.contains('product--columns');
        if (!desktopColumns) return;

        const mediaImages = product.querySelectorAll('.product__media img');
        if (!mediaImages.length) return;

        let mediaImageSizes =
          '(min-width: 1000px) 715px, (min-width: 750px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)';

        if (product.classList.contains('product--medium')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '605px');
        } else if (product.classList.contains('product--small')) {
          mediaImageSizes = mediaImageSizes.replace('715px', '495px');
        }

        mediaImages.forEach((img) => img.setAttribute('sizes', mediaImageSizes));
      }
    }
  );
}
