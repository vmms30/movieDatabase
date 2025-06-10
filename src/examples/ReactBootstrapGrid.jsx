import React from 'react';

const GridDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          React Responsive Bootstrap Grid System
        </h1>
        
        {/* Basic Grid Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Basic 12-Column Grid</h2>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-12 bg-blue-500 text-white p-4 rounded text-center">
              col-12 (Full Width)
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6 bg-green-500 text-white p-4 rounded text-center">
              col-6
            </div>
            <div className="col-span-6 bg-green-500 text-white p-4 rounded text-center">
              col-6
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-4 bg-purple-500 text-white p-4 rounded text-center">
              col-4
            </div>
            <div className="col-span-4 bg-purple-500 text-white p-4 rounded text-center">
              col-4
            </div>
            <div className="col-span-4 bg-purple-500 text-white p-4 rounded text-center">
              col-4
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 bg-red-500 text-white p-4 rounded text-center">
              col-3
            </div>
            <div className="col-span-3 bg-red-500 text-white p-4 rounded text-center">
              col-3
            </div>
            <div className="col-span-3 bg-red-500 text-white p-4 rounded text-center">
              col-3
            </div>
            <div className="col-span-3 bg-red-500 text-white p-4 rounded text-center">
              col-3
            </div>
          </div>
        </section>

        {/* Responsive Grid Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Responsive Breakpoints</h2>
          <p className="text-gray-600 mb-6">
            Resize your browser to see the responsive behavior: 
            <span className="font-medium"> Mobile (1 col) → Tablet (2 cols) → Desktop (4 cols)</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-indigo-500 text-white p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Card 1</h3>
              <p className="text-sm">Responsive column that adapts to screen size</p>
            </div>
            <div className="bg-indigo-500 text-white p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Card 2</h3>
              <p className="text-sm">Responsive column that adapts to screen size</p>
            </div>
            <div className="bg-indigo-500 text-white p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Card 3</h3>
              <p className="text-sm">Responsive column that adapts to screen size</p>
            </div>
            <div className="bg-indigo-500 text-white p-6 rounded-lg text-center">
              <h3 className="font-bold mb-2">Card 4</h3>
              <p className="text-sm">Responsive column that adapts to screen size</p>
            </div>
          </div>
        </section>

        {/* Mixed Column Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Mixed Column Sizes</h2>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-12 sm:col-span-8 bg-orange-500 text-white p-4 rounded text-center">
              Main Content (col-8 on SM+)
            </div>
            <div className="col-span-12 sm:col-span-4 bg-orange-400 text-white p-4 rounded text-center">
              Sidebar (col-4 on SM+)
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-3 bg-teal-500 text-white p-4 rounded text-center">
              Nav (col-3 on MD+)
            </div>
            <div className="col-span-12 md:col-span-6 bg-teal-400 text-white p-4 rounded text-center">
              Content (col-6 on MD+)
            </div>
            <div className="col-span-12 md:col-span-3 bg-teal-500 text-white p-4 rounded text-center">
              Aside (col-3 on MD+)
            </div>
          </div>
        </section>

        {/* Offset Columns */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Offset Columns</h2>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-6 col-start-4 bg-pink-500 text-white p-4 rounded text-center">
              col-6 offset-3 (Centered)
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 col-start-3 bg-yellow-500 text-white p-4 rounded text-center">
              col-4 offset-2
            </div>
            <div className="col-span-4 bg-yellow-400 text-white p-4 rounded text-center">
              col-4
            </div>
          </div>
        </section>

        {/* Nested Grids */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Nested Grids</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 bg-gray-200 p-4 rounded">
              <h3 className="font-semibold mb-4 text-gray-800">Outer Container</h3>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 bg-cyan-500 text-white p-3 rounded text-center">
                  Nested col-6
                </div>
                <div className="col-span-6 bg-cyan-400 text-white p-3 rounded text-center">
                  Nested col-6
                </div>
              </div>
            </div>
            <div className="col-span-4 bg-gray-300 p-4 rounded">
              <h3 className="font-semibold mb-2 text-gray-800">Sidebar</h3>
              <p className="text-gray-600 text-sm">This is a sidebar next to the nested grid</p>
            </div>
          </div>
        </section>

        {/* Auto Layout */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Auto Layout Columns</h2>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-emerald-500 text-white p-4 rounded text-center">
              Auto
            </div>
            <div className="flex-1 bg-emerald-500 text-white p-4 rounded text-center">
              Auto
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-emerald-400 text-white p-4 rounded text-center">
              Auto
            </div>
            <div className="flex-1 bg-emerald-400 text-white p-4 rounded text-center">
              Auto
            </div>
            <div className="flex-1 bg-emerald-400 text-white p-4 rounded text-center">
              Auto
            </div>
          </div>
        </section>

        {/* Breakpoint Reference */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Breakpoint Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-4 font-semibold">Breakpoint</th>
                  <th className="text-left py-2 px-4 font-semibold">Tailwind Class</th>
                  <th className="text-left py-2 px-4 font-semibold">Min Width</th>
                  <th className="text-left py-2 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">XS</td>
                  <td className="py-2 px-4 font-mono text-blue-600">default</td>
                  <td className="py-2 px-4">0px</td>
                  <td className="py-2 px-4">Mobile phones</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">SM</td>
                  <td className="py-2 px-4 font-mono text-blue-600">sm:</td>
                  <td className="py-2 px-4">640px</td>
                  <td className="py-2 px-4">Large phones, small tablets</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">MD</td>
                  <td className="py-2 px-4 font-mono text-blue-600">md:</td>
                  <td className="py-2 px-4">768px</td>
                  <td className="py-2 px-4">Tablets</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">LG</td>
                  <td className="py-2 px-4 font-mono text-blue-600">lg:</td>
                  <td className="py-2 px-4">1024px</td>
                  <td className="py-2 px-4">Small laptops</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">XL</td>
                  <td className="py-2 px-4 font-mono text-blue-600">xl:</td>
                  <td className="py-2 px-4">1280px</td>
                  <td className="py-2 px-4">Large laptops, desktops</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GridDemo;