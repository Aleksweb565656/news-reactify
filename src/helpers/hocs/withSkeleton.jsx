import Skeleton from "../../components/Skeleton/Skeleton"

function withSkeleton (Componet, type, count, direction) {
	return function WithSkeleton(props) {
		const {isLoading, ...restProps} = props
		if(isLoading) {
			return <Skeleton type={type} count={count} direction={direction} />;
		}
		return <Componet {...restProps} />
	};
}

export default withSkeleton;