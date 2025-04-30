

export default function BottomPage({ params }: { params: { bottom: string } }) {
    return (
        <div>
            <h1>Bottom Page</h1>
            <p>Parameter: {params.bottom}</p>
        </div>
    );
}