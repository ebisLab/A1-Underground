import React from 'react'
import Product from './Product'

export default function Landing({products}) {
    return (
        <main>
            <section className="underground_hero" style={{height: "100vh", position: "relative"}}>
                <div className="overfilter">
                <div className="hero-text">
                    <h1>1A <i className="fa fa-star" aria-hidden="true"></i> Underground</h1>
                </div>
                </div>
            </section>
            <section  className="contain">
                <h2>1A Underground is a <em>text message network</em>.</h2>

                <p>
                Named for the First Amendment, itʼs how the truth-tellers can continue to communicate directly. 
                By joining 1A 
                Underground youʼll be the first to learn what the mainstream media doesnʼt want you to know.
                </p>

                <p>
                And unlike free services, we never sell or share your data and we protect privacy.
                </p>

                
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <p>
                Membership is only $9.50 a month
                </p>

						{ products.length ? (
							products.map( product => <Product key={ product.id } product={ product }/> )
						) : '' }

            </section>
            
        </main>
    )
}
