import { useState } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { pokeApi } from '../../api';
import { Layout } from '../../component/layouts';
import { Pokemon, PokemonListResponse } from '../../interface';
import { localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { getPokemonInfo } from '../../utils/getPokemonsInfo';



interface Props {
  pokemon: Pokemon;
}


const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorite, setisInFavorite] =useState(localFavorites.existInFavorites( pokemon.id ))

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id );
    setisInFavorite(!isInFavorite)
   
    if(isInFavorite) return 
         confetti({
        zIndex:999,
        particleCount: 200,
        spread: 160,
        angle: -100,
        origin:{
          x: 1,
          y: 0,
        }

      })

    
  }
    
    return (
        <Layout title={pokemon.name}>
           
           <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
              <Grid xs={ 12 } sm={ 4 } >
                <Card hoverable css={{ padding: '30px' }}>
                    <Card.Body>
                      <Card.Image 
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                        alt={ pokemon.name }
                        width="100%"
                        height={ 200 }
                      />
                    </Card.Body>
                </Card>
              </Grid>

              <Grid xs={ 12 } sm={ 8 }>
                <Card>
                  <Card.Header css={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',  }}>
                    <Text h1 transform='capitalize'>{ pokemon.name }</Text>

                    <Button
                      size="sm"
                      color="gradient"
                     
                       onClick={onToggleFavorite}
                    >
                      {isInFavorite ? 'En Favoritos': 'Guardar en Favoritos'}
                 
                    </Button>
                  </Card.Header>

                  <Card.Body>
                    <Text size={30}>Sprites:</Text>

                    <Container direction='row' display='flex' gap={ 0 }>
                        <Image 
                          src={ pokemon.sprites.front_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.back_default }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.front_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />
                        <Image 
                          src={ pokemon.sprites.back_shiny }
                          alt={ pokemon.name }
                          width={ 100 }
                          height={ 100 }
                        />

                    </Container>


                  </Card.Body>  


                </Card>
              </Grid>

           </Grid.Container>



        </Layout>
    )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name );
  
    return {
      paths: pokemonNames.map( name => ({
        params: { name }
      })),
      fallback: 'blocking'
    }
  }
  
  
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { name } = params as { name: string };

    const pokemon = await getPokemonInfo(name) 

    if(!pokemon){
  
     return{
       redirect: {
         destination:'/',
         permanent: false
       }
     }
    }
   return {
     props: {
       pokemon
     },
     revalidate: 86400,
   }
  }
  
  
  
  
  
  export default PokemonByNamePage;
  
  