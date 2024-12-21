import { bouncy } from 'ldrs'

bouncy.register()

export const BounceLoadAnime = (props) => {
    const {color,text}=props
    return (
        <>
            <l-bouncy
    size="25"
    speed="1.75" 
    color={color||"white"} 
    className="mr-2"
    > </l-bouncy>
    <p className='ml-2'>{text||"finding areas for chosen city"}</p>
    </>)
}