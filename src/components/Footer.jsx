export default function Footer() {
  return (
    <footer className="w-full py-10 mt-10 border-t border-gray-200 dark:border-slate-800 text-center relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
        
        <p className="text-gray-700 dark:text-gray-300 font-medium">
          Designed & Built by <span className="text-blue-600 dark:text-blue-500 font-bold">Purushottam Garad</span>
        </p>
        
        {/* Live Visitor Counter Badge */}
        <div className="mt-2" title="Total Portfolio Views">
          <img 
            src="https://api.visitorbadge.io/api/visitors?path=itspuru21.portfolio&countColor=%232563eb" 
            alt="Portfolio Visits" 
            className="opacity-90 hover:opacity-100 transition-opacity rounded shadow-sm"
          />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          © {new Date().getFullYear()} · All rights reserved
        </p>
      </div>
    </footer>
  );
}