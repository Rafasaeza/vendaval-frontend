export default function Wrapper({ children }) {
    return (
      <div className="max-w-2xl mt-5 mb-5 mx-auto space-y-4 p-4 border rounded shadow">  
        {children}
      </div>
    );
  }