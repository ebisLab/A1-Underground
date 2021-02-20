import React, { useState, useEffect } from 'react';
export const AppContext = React.createContext([
	{},
	() => {}
]);

export const AppProvider = ( props ) => {

	const [ cart, setCart ] = useState( null );
	const [ extraInput, setExtraInput ] = useState( null );

	const [refreshMe, setRefreshMe]=useState(false);

	useEffect( () => {

		// @TODO Will add option to show the cart with localStorage later.
		if ( process.browser ) {

			let cartData = localStorage.getItem( 'woo-next-cart' );
			cartData = null !== cartData ? JSON.parse( cartData ) : '';
			setCart( cartData );

		}

	}, [] );

	return (
		<AppContext.Provider value={ [ cart, setCart, refreshMe, setRefreshMe, extraInput, setExtraInput ] }>
			{ props.children }
		</AppContext.Provider>
	);
};
