import * as basicLightbox from 'basiclightbox';

export const modal = basicLightbox.create(`
<div class="modal">
    <h2 class="mod-title"></h2>
    <p class="text">
        The unique id is <span class="id-value"></span>
    </p>
    <button class="button" type="submit" id="button-modal">OK</button>
</div>
`);
