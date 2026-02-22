function App() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="container-custom py-xl">
        
        {/* Test Custom Colors */}
        <h1 className="text-4xl font-bold text-primary mb-md">
          Tailwind v3 Working! ✅
        </h1>
        
        {/* Test Custom Spacing */}
        <div className="space-y-sm">
          <p className="text-secondary">Custom spacing: xs, sm, md, lg, xl, 2xl, 3xl</p>
          
          {/* Test Custom Button */}
          <button className="btn-primary">
            Custom Button
          </button>
          
          {/* Test Card Component */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-xs">Card Component</h2>
            <p className="text-neutral-600">Custom shadow and hover effect</p>
          </div>
          
          {/* Test Animation */}
          <div className="animate-fade-in bg-accent text-white p-md rounded-md">
            Fade-in animation working!
          </div>
        </div>
      </div>
    </div>
  )
}

export default App