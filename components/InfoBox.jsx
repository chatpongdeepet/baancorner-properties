import Link from 'next/link'

const InfoBox = ({
	                 heading,
	                 backgroundColor = 'bg-lionsmane-300',
	                 textColor = 'text-celeste-900',
	                 buttonInfo,
	                 children
                 }) => {
	return (
		<div className = {`${backgroundColor} p-6 rounded-lg shadow-md`}>
			<h2 className = {`${textColor} text-2xl font-bold`}>{heading}</h2>
			<p className = {`${textColor} mt-2 mb-4`}>
				{children}
			</p>
			<Link
				href = {buttonInfo.link}
				className = {`inline-block bg-midnight-800 text-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:opacity-80 ${buttonInfo.backgroundColor}`}
			>
				{buttonInfo.text}
			</Link>
		</div>
	);
};

export default InfoBox;
