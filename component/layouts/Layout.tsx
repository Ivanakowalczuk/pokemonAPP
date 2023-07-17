

import Head from 'next/head';
import { FunctionComponent } from 'react';
import { Navbar } from '../ui';


interface Props {
  title?: string,
  children: any
}
const baseURL = (typeof window === 'undefined') ? '' : window.location.origin;


const Layout: FunctionComponent<Props> = ({ title , children }) => {
  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name="author" content="Ivana Kowalczuk" />
            <meta name="description" content={`Información sobre el pokémon ${ title }`} />
            <meta name="keywords" content={ `${ title }, pokemon, pokedex`} />
            <meta property="og:title" content={`Información sobre ${ title }`} />
            <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
            <meta property="og:image" content={`${ baseURL }/img/banner.png`} />

        </Head>
      
        <Navbar />

        <main style={{
          padding: '0px 20px'
        }}>
            { children }
        </main>
      
      </>
    );
}
 
export default Layout;

