<?php

use Coderun\BuyOneClick\Utils\Translation;

if (!defined('ABSPATH')) {
    exit;
}
?>
<?php
/**
 * Шаблон формы быстрого заказа
 */
/** @var \Coderun\BuyOneClick\SimpleDataObjects\FieldsOfOrderForm $fields */
/** @var \Coderun\BuyOneClick\Templates\QuickOrderForm $render */
$commonOptions = $render->getCommonOptions();
?>
<div id="formOrderOneClick">
    <form id="buyoneclick_form_order" class="b1c-form validate-form" method="post" action="#" novalidate="novalidate">
        <?php if ($commonOptions->isEnableProductInformation()) { ?>
        <div class="order-one-click__product-inner">
            <?php if (!empty($fields->productImg)) { ?>
            <div class="order-one-click__product-pic">
                <?php echo $fields->productSrcImg; ?>
            </div>
            <?php } ?>
            <div class="order-one-click__product-info">
                <div class="order-one-click__product-title"><?php echo $fields->productName; ?></div>
                <div class="order-one-click__product-more">
                    <div class="order-one-click__product-style">SKU: <?php echo $fields->productScu; ?></div>
                    <div class="order-one-click__product-price"><?php echo $fields->productPriceHtml; ?></div>
                </div>
                <?php
                if($fields->product instanceof \WC_Product_Variation) {
                    $attribute_summary = $fields->product->get_attribute_summary();
                    if(!empty($attribute_summary)){ ?>
                        <ul class="order-one-click__product-details">
                            <?php foreach(explode(',', $fields->product->get_attribute_summary()) as $attr){ ?>
                                <li>
                                    <?php $attr = explode(':', $attr); ?>
                                    <div><?=$attr[0]?>:</div>
                                    <span><?=$attr[1]?></span>
                                </li>
                            <?php } ?>
                        </ul>
                    <?php }
                }
                ?>
            </div>
        </div>
        <?php } ?>
        <div class="order-one-click__form">
            <div class="one-click-form" id="one-click-form">
                <div class="order-one-click__form-wrapper">
                    <?php if ($commonOptions->isEnableFieldWithPhone()) { ?>
                        <div class="input-wrapper">
                            <label>Phone <span>*</span></label>
                            <input class="input" type="tel" oninput="this.value = this.value.replace(/[^0-9+\(\)\-\s]/g, '').replace(/([+\(\)\-\s])\1+/g, '$1').replace(/^\s+/, '');"  name="txtphone" data-title="Phone" data-rule-required="true" data-msg-required="This field is required">
                        </div>
                    <?php } ?>
                    <button class="btn buyButtonOkForm" type="submit" name="btnsend">
                        <span>
                            Submit
                            <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>



        <?php if ($commonOptions->isEnableFieldWithName()) { ?>
            <input class="buyvalide <?php echo $fields->templateStyle ? 'input-text' : '' ?>" type="text" <?php ?> placeholder="<?php echo Translation::translate($commonOptions->getDescriptionForFieldName()); ?>" name="txtname">
        <?php } ?>
        <?php if ($commonOptions->isEnableFieldWithEmail()) { ?>
            <input class="buyvalide <?php echo $fields->templateStyle ? 'input-text' : '' ?> " type="email" <?php ?> placeholder="<?php echo Translation::translate($commonOptions->getDescriptionForFieldEmail()); ?>" name="txtemail">
        <?php } ?>
        <?php if ($commonOptions->isEnableFieldWithComment()) { ?>
            <textarea class="buymessage buyvalide" <?php ?> name="message" placeholder="<?php echo Translation::translate($commonOptions->getDescriptionForFieldComment()); ?>" rows="2" value=""></textarea>
        <?php } ?>

        <?php if ($commonOptions->isConsentToProcessing()) { ?>
            <p>
                <input type="checkbox" name="conset_personal_data">
                <?php echo Translation::translate($commonOptions->getDescriptionConsentToProcessing()); ?>
            </p>
        <?php } ?>

        <?php echo $fields->formWithQuantity; ?>

        <?php wp_nonce_field('one_click_send', '_coderun_nonce'); ?>
        <input type="hidden" name="nametovar" value="<?php echo htmlspecialchars($fields->productName); ?>" />
        <input type="hidden" name="pricetovar" value="<?php echo $fields->productPrice; ?>" />
        <input type="hidden" name="idtovar" value="<?php echo $fields->productId; ?>" />
        <input type="hidden" name="action" value="coderun_send_form_buy_one_click_buybuttonform" />
        <input type="hidden" name="custom" value="<?php echo $fields->shortCode; ?>"/>

        <?php
        //Форма файлов
        echo $fields->formWithFiles;

        if ($commonOptions->isRecaptchaEnabled()) {
            Coderun\BuyOneClick\ReCaptcha::getInstance()->view($commonOptions->getCaptchaProvider());
        }

        ?>

        <p class="form-message-result"></p>
    </form>
    <?php
    if (0 && $commonOptions->getActionAfterSubmittingForm() > 0) {
        ?>
        <div id="reviews-popup-success" class="popup reviews-popup-success">
            <button title="Close (Esc)" type="button" class="mfp-close">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5333 6.99999H13.0666C13.0672 8.40357 12.581 9.76391 11.6909 10.8492C10.8009 11.9345 9.56208 12.6776 8.18556 12.9519C6.80904 13.2262 5.38 13.0147 4.14194 12.3535C2.90388 11.6922 1.93339 10.6222 1.39586 9.32559C0.858327 8.02902 0.787 6.58617 1.19403 5.24291C1.60107 3.89964 2.46128 2.73907 3.62809 1.95895C4.7949 1.17882 6.19612 0.827421 7.59298 0.964614C8.98984 1.10181 10.2959 1.71911 11.2887 2.71133C11.853 3.27376 12.3006 3.94219 12.6057 4.67819C12.9109 5.41419 13.0675 6.20325 13.0666 6.99999H14C14 5.61552 13.5894 4.26215 12.8203 3.11101C12.0511 1.95986 10.9579 1.06266 9.67877 0.532845C8.39969 0.00303305 6.99223 -0.13559 5.63436 0.134506C4.2765 0.404602 3.02922 1.07129 2.05025 2.05025C1.07129 3.02922 0.404602 4.2765 0.134506 5.63436C-0.13559 6.99223 0.00303305 8.39969 0.532845 9.67877C1.06266 10.9579 1.95986 12.0511 3.11101 12.8203C4.26215 13.5894 5.61552 14 6.99999 14C8.8565 14 10.637 13.2625 11.9497 11.9497C13.2625 10.637 14 8.8565 14 6.99999H13.5333Z" fill="#191919"></path>
                    <path d="M4.36154 10.2999L10.2999 4.36154C10.3874 4.27398 10.4366 4.15521 10.4366 4.03138C10.4366 3.90754 10.3874 3.78878 10.2999 3.70121C10.2123 3.61365 10.0935 3.56445 9.9697 3.56445C9.84586 3.56445 9.7271 3.61365 9.63954 3.70121L3.70121 9.63954C3.65785 9.68289 3.62346 9.73437 3.6 9.79102C3.57653 9.84767 3.56445 9.90838 3.56445 9.9697C3.56445 10.031 3.57653 10.0917 3.6 10.1484C3.62346 10.205 3.65785 10.2565 3.70121 10.2999C3.74457 10.3432 3.79604 10.3776 3.85269 10.4011C3.90934 10.4245 3.97006 10.4366 4.03138 10.4366C4.0927 10.4366 4.15341 10.4245 4.21006 10.4011C4.26671 10.3776 4.31819 10.3432 4.36154 10.2999Z" fill="#191919"></path>
                    <path d="M3.70121 4.36154L9.63954 10.2999C9.7271 10.3874 9.84586 10.4366 9.9697 10.4366C10.0935 10.4366 10.2123 10.3874 10.2999 10.2999C10.3874 10.2123 10.4366 10.0935 10.4366 9.9697C10.4366 9.84586 10.3874 9.7271 10.2999 9.63954L4.36154 3.70121C4.31819 3.65785 4.26671 3.62346 4.21006 3.6C4.15341 3.57653 4.0927 3.56445 4.03138 3.56445C3.97006 3.56445 3.90934 3.57653 3.85269 3.6C3.79604 3.62346 3.74457 3.65785 3.70121 3.70121C3.65785 3.74457 3.62346 3.79604 3.6 3.85269C3.57653 3.90934 3.56445 3.97006 3.56445 4.03138C3.56445 4.0927 3.57653 4.15341 3.6 4.21006C3.62346 4.26671 3.65785 4.31819 3.70121 4.36154Z" fill="#191919"></path>
                </svg>
            </button>
            <?php echo Translation::translate($commonOptions->getMessageAfterSubmittingForm());  ?>
        </div>
        <?php
    }
    ?>
</div>

