export default function ApplicationLogo(props) {
    return (
        <h1 {...props} className={`font-black tracking-tighter text-2xl ${props.className}`}>
            FRANCS.
        </h1>
    );
}
