<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<?php
/**
 * Кнопка для вызова формы заказа
 */
/** @var \Coderun\BuyOneClick\SimpleDataObjects\OrderButton $fields */
/** @var \Coderun\BuyOneClick\Templates\OrderButton $render */
?>
<script><?php echo $fields->inlineScript; ?></script>
<!--<style><?php /*echo $fields->inlineStyle; */?></style>-->
<button
    class="btn btn-buy clickBuyButton"
    data-variation_id="<?php echo $fields->variationId; ?>"
    data-productid="<?php echo $fields->productId; ?>">
    <span>
        <?php echo \Coderun\BuyOneClick\Utils\Translation::translate($fields->buttonName); ?>
        <svg width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L0 8L2 4L-3.49691e-07 0L4 4Z" fill="white"></path>
        </svg>
    </span>
</button>
