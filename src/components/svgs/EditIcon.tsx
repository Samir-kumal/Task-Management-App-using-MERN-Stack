interface EditIconProps {
    width?: number;
    height?: number;
    fill?: string;
    }

const EditIcon:React.FC<EditIconProps> = ({width, height,fill}) => {
  return (
    <svg width={width ? width :"22"} height={height ? height :"22"} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_75_285)">
<path d="M12.8237 12.959L10.9609 19.1709C10.8027 19.6992 10.9472 20.2725 11.3373 20.6621C11.6225 20.9473 12.0058 21.1016 12.3979 21.1016C12.5419 21.1016 12.687 21.081 12.8286 21.0381L19.041 19.1758C19.2787 19.1045 19.4956 18.9756 19.6708 18.7998L31.0605 7.41016C31.3417 7.12891 31.4999 6.74707 31.4999 6.34961C31.4999 5.95215 31.3417 5.57031 31.0605 5.28906L26.7104 0.939455C26.1245 0.353515 25.1752 0.353515 24.5893 0.939455L13.2001 12.3291C13.0244 12.5049 12.8955 12.7207 12.8237 12.959ZM15.5888 14.1826L25.6498 4.12109L27.8784 6.34961L17.8173 16.4111L14.6347 17.3652L15.5888 14.1826Z" fill= {fill ? fill : "#666666"}/>
<path d="M30 14.5C29.1714 14.5 28.5 15.1719 28.5 16V26C28.5 27.3789 27.3784 28.5 26 28.5H6C4.62158 28.5 3.5 27.3789 3.5 26V6C3.5 4.62109 4.62158 3.5 6 3.5H16C16.8286 3.5 17.5 2.82812 17.5 2C17.5 1.17188 16.8286 0.5 16 0.5H6C2.96729 0.5 0.5 2.96777 0.5 6V26C0.5 29.0322 2.96729 31.5 6 31.5H26C29.0327 31.5 31.5 29.0322 31.5 26V16C31.5 15.1719 30.8286 14.5 30 14.5Z" fill= {fill ? fill : "#666666"}/>
</g>
<defs>
<clipPath id="clip0_75_285">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>

  )
}

export default EditIcon