import {
	FacebookShareButton,
	TwitterShareButton,
	LineShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	LineIcon,
	EmailIcon
} from 'react-share'

const SharedButtons = ({property}) => {
	const hashtags = `${property.type.replace(/\s/g, '')}ForRent`

	const sharedUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
	return (
		<>
			<h3 className = "text-xl font-bold text-center pt-2">
				Share This Property:
			</h3>
			<div className = "flex gap-3 justify-center pb-5">
				<FacebookShareButton
					url = {sharedUrl}
					quote = {property.name}
					hashtags = {[hashtags]}
				>
					<FacebookIcon
						size = {40}
						round = {true}
					/>
				</FacebookShareButton>
				<TwitterShareButton
					url = {sharedUrl}
					quote = {property.name}
					hashtags = {[hashtags]}
				>
					<TwitterIcon
						size = {40}
						round = {true}
					/>
				</TwitterShareButton>
				<LineShareButton
					url = {sharedUrl}
					title = {`Check out this property listing: ${sharedUrl}`}
				>
					<LineIcon
						size = {40}
						round = {true}
					/>
				</LineShareButton>
				<EmailShareButton
					url = {sharedUrl}
					subject = {property.name}
					body = {`Check out this property listing: ${sharedUrl}`}
				>
					<EmailIcon
						size = {40}
						round = {true}
					/>
				</EmailShareButton>
			</div>
		</>
	);
};

export default SharedButtons;
