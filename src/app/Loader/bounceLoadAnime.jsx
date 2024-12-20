import { bouncy } from 'ldrs'

bouncy.register()

export const BounceLoadAnime = () => {
    return (
        <>
            <l-bouncy
    size="25"
    speed="1.75" 
    color="white" 
    className="mr-2"
    > </l-bouncy>
    <p className='ml-2'>finding areas for chosen city</p>
    </>)
}