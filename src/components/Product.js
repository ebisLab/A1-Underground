import AddToCartButton from '../components/cart/AddToCartButton';

const Product = ( props ) => {
	const { product } = props;

	return (
		// @TODO Need to handle Group products differently.
		undefined !== product && 'GroupProduct' !== product.__typename ? (
			<div className="product mb-5">
				<div className="product-info">
					<AddToCartButton {...props} product={ product }/>
				</div>

			</div>
		) : (
			''
		)
	);
};

export default Product;
