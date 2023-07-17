

import Head from 'next/head';
import { FunctionComponent } from 'react';
import { Navbar } from '../ui';


interface Props {
  title?: string,
  children: any
}
 
const Layout: FunctionComponent<Props> = ({ title , children }) => {
  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name="author" content="Fernando Herrera" />
            <meta name="description" content={`Información sobre el pokémon ${ title }`} />
            <meta name="keywords" content={ `${ title }, pokemon, pokedex`} />
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

