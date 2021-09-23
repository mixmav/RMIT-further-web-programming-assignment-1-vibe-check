import './Avatar.scss';

function Avatar(props){
	return (
		<div className={`app-common-component--avatar-container ${(props.size === "small") ? 'small ': ''}`}>

			<img src={"https://avatars.dicebear.com/api/bottts/" + hashString(props.seed) + '.svg'} alt="User avatar"/>
		</div>
	);
}

export default Avatar;

const hashString = str => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash &= hash;
	}
	return new Uint32Array([hash])[0].toString(36);
};