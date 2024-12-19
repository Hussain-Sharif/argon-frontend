
import { trefoil } from "ldrs"
trefoil.register()
export const LoadingAnime = () => {
    return(
        <div className='flex h-screen  flex-col justify-center items-center'>
          <l-trefoil
          size="45"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4" 
          color="black" 
        ></l-trefoil>
      </div>
    )
}