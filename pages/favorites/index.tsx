import { useEffect, useState } from 'react';
import { Layout } from '../../component/layouts';
import { NotFavorites } from '../../component/ui';
import { localFavorites } from '../../utils';
import { FavoritesComponent } from '../../component/pokemon';


const FavoritesPage = () => {

const [isFavorites, setisFavorites]= useState<number[]>([])

useEffect(()=>{
 setisFavorites(localFavorites.pokemons())
},[])



  return (
      <Layout title='Pokémons - Favoritos'>
        <h1>Favoritos</h1>
        {isFavorites.length === 0 ?  <NotFavorites/> : <FavoritesComponent  pokemons={isFavorites}/> }
       
      </Layout>
  )
};

export default FavoritesPage;