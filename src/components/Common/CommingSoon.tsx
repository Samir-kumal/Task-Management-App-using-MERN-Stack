import { Player } from "@lottiefiles/react-lottie-player";

const CommingSoon = () => {
  return (
    <div className='flex flex-row items-center justify-center  w-full'>

      <Player
        autoplay
        loop
        src="https://lottie.host/637ec411-31d3-4d1c-866a-1095b17bd96b/GjKpbCktT3.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>
  )
}

export default CommingSoon