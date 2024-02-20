interface DeleteIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const DeleteIcon:React.FC<DeleteIconProps> = ({ width, height, fill }) => {
  return (
    <svg
      width={width ? width : "32"}
      height={height ? height : "32"}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.2 12.193L23.8 24.3C23.7659 25.3369 23.3291 26.3197 22.5823 27.0398C21.8355 27.76 20.8374 28.1607 19.8 28.157H12.2C11.1632 28.1607 10.1658 27.7606 9.41904 27.0413C8.67234 26.322 8.23509 25.3402 8.2 24.304L7.8 12.193C7.79125 11.9278 7.88821 11.67 8.06956 11.4763C8.25091 11.2825 8.50178 11.1688 8.767 11.16C9.03222 11.1513 9.29005 11.2482 9.48377 11.4296C9.6775 11.6109 9.79125 11.8618 9.8 12.127L10.2 24.237C10.2199 24.754 10.4394 25.2431 10.8123 25.6017C11.1853 25.9603 11.6826 26.1604 12.2 26.16H19.8C20.318 26.1604 20.816 25.9597 21.189 25.6003C21.5621 25.2409 21.7811 24.7507 21.8 24.233L22.2 12.127C22.2088 11.8618 22.3225 11.6109 22.5162 11.4296C22.71 11.2482 22.9678 11.1513 23.233 11.16C23.4982 11.1688 23.7491 11.2825 23.9304 11.4763C24.1118 11.67 24.2088 11.9278 24.2 12.193ZM25.523 8.16403C25.523 8.42925 25.4176 8.6836 25.2301 8.87114C25.0426 9.05867 24.7882 9.16403 24.523 9.16403H7.478C7.21278 9.16403 6.95843 9.05867 6.77089 8.87114C6.58336 8.6836 6.478 8.42925 6.478 8.16403C6.478 7.89881 6.58336 7.64446 6.77089 7.45692C6.95843 7.26939 7.21278 7.16403 7.478 7.16403H10.578C10.8948 7.16488 11.2007 7.04782 11.436 6.83563C11.6713 6.62343 11.8192 6.33128 11.851 6.01603C11.9248 5.27652 12.2713 4.59096 12.8229 4.09294C13.3745 3.59492 14.0918 3.3201 14.835 3.32203H17.165C17.9082 3.3201 18.6255 3.59492 19.1771 4.09294C19.7287 4.59096 20.0752 5.27652 20.149 6.01603C20.1808 6.33128 20.3287 6.62343 20.564 6.83563C20.7993 7.04782 21.1052 7.16488 21.422 7.16403H24.522C24.7872 7.16403 25.0416 7.26939 25.2291 7.45692C25.4166 7.64446 25.522 7.89881 25.522 8.16403H25.523ZM13.587 7.16403H18.415C18.2836 6.86377 18.1976 6.54562 18.16 6.22003C18.1352 5.97354 18.0198 5.74502 17.8362 5.57874C17.6526 5.41247 17.4137 5.32028 17.166 5.32003H14.836C14.5883 5.32028 14.3494 5.41247 14.1658 5.57874C13.9822 5.74502 13.8668 5.97354 13.842 6.22003C13.804 6.54567 13.7188 6.86383 13.587 7.16403ZM14.594 22.315V13.8C14.594 13.5348 14.4886 13.2805 14.3011 13.0929C14.1136 12.9054 13.8592 12.8 13.594 12.8C13.3288 12.8 13.0744 12.9054 12.8869 13.0929C12.6994 13.2805 12.594 13.5348 12.594 13.8V22.319C12.594 22.5842 12.6994 22.8386 12.8869 23.0261C13.0744 23.2137 13.3288 23.319 13.594 23.319C13.8592 23.319 14.1136 23.2137 14.3011 23.0261C14.4886 22.8386 14.594 22.5842 14.594 22.319V22.315ZM19.408 22.315V13.8C19.408 13.5348 19.3026 13.2805 19.1151 13.0929C18.9276 12.9054 18.6732 12.8 18.408 12.8C18.1428 12.8 17.8884 12.9054 17.7009 13.0929C17.5134 13.2805 17.408 13.5348 17.408 13.8V22.319C17.408 22.5842 17.5134 22.8386 17.7009 23.0261C17.8884 23.2137 18.1428 23.319 18.408 23.319C18.6732 23.319 18.9276 23.2137 19.1151 23.0261C19.3026 22.8386 19.408 22.5842 19.408 22.319V22.315Z"
        fill={fill ? fill : "none"}
      />
    </svg>
  );
};

export default DeleteIcon;
