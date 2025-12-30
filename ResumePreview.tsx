import React from 'react';
import { ResumeData, Section, SectionItem } from '../types';
import { Mail, Phone, MapPin, User, Linkedin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  id?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, id }) => {
  const { personalInfo, sections, template, primaryColor, contentScale = 1 } = data;

  // Helper style for scaling content to fit A4
  // We inverse width and scale down to simulate "fitting more content"
  const scaleStyle: React.CSSProperties = {
    width: `${100 / contentScale}%`,
    transform: `scale(${contentScale})`,
    transformOrigin: 'top left',
    minHeight: `${297 / contentScale}mm` // A4 Height scaled
  };

  // Helper to render section items
  const renderItems = (section: Section) => {
    if (section.type === 'skills') {
      return (
        <div className="flex flex-wrap gap-2">
          {section.items.map(item => (
            <span key={item.id} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              {item.description || item.title}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {section.items.map((item) => (
          <div key={item.id} className="relative">
             <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-gray-800 text-md">{item.title}</h4>
                {item.date && <span className="text-sm text-gray-500 shrink-0 ml-2">{item.date}</span>}
             </div>
             {item.subtitle && <div className="text-sm font-semibold text-gray-600 mb-1">{item.subtitle}</div>}
             {item.description && <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{item.description}</p>}
          </div>
        ))}
      </div>
    );
  };

  // --- TEMPLATE: MODERN (Dark Header like the image) ---
  if (template === 'modern') {
    return (
      <div id={id} className="print-area w-full bg-white text-gray-800 overflow-hidden relative" style={{ height: 'auto' }}>
        <div style={scaleStyle}>
            {/* Header */}
            <div className="bg-gray-900 text-white p-8 relative overflow-hidden">
              <div className="flex justify-between items-center relative z-10">
                <div className="max-w-[65%]">
                  <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName || 'Seu Nome'}</h1>
                  {personalInfo.title && <p className="text-xl text-gray-300 font-light tracking-widest uppercase">{personalInfo.title}</p>}
                </div>
                {personalInfo.photoUrl && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg shrink-0">
                    <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-overlay -mr-16 -mt-16 opacity-50"></div>
            </div>

            {/* Contact Strip */}
            <div className="bg-gray-100 py-4 px-8 flex flex-wrap gap-4 text-sm border-b border-gray-300">
               {personalInfo.address && <div className="flex items-center"><MapPin size={14} className="mr-2 text-gray-600"/> {personalInfo.address}</div>}
               {personalInfo.phone && <div className="flex items-center"><Phone size={14} className="mr-2 text-gray-600"/> {personalInfo.phone}</div>}
               {personalInfo.email && <div className="flex items-center"><Mail size={14} className="mr-2 text-gray-600"/> {personalInfo.email}</div>}
               {personalInfo.linkedin && <div className="flex items-center"><Linkedin size={14} className="mr-2 text-gray-600"/> {personalInfo.linkedin}</div>}
            </div>

            {/* Body Content */}
            <div className="p-8 space-y-8">
               {/* Summary Section (Fixed position usually) */}
               {personalInfo.summary && (
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1" style={{borderColor: primaryColor}}>
                        Sobre Mim
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm text-justify">
                        {personalInfo.summary}
                    </p>
                  </div>
               )}

               {/* Dynamic Sections */}
               {sections.map(section => (
                 <div key={section.id}>
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 border-gray-800 pb-1 flex items-center" style={{borderColor: primaryColor}}>
                       {section.title}
                    </h3>
                    {renderItems(section)}
                 </div>
               ))}
            </div>
        </div>
      </div>
    );
  }

  // --- TEMPLATE: MINIMAL (Left Sidebar) ---
  if (template === 'minimal') {
    return (
        <div id={id} className="print-area w-full bg-white relative overflow-hidden" style={{ height: 'auto' }}>
           <div style={scaleStyle} className="flex min-h-full">
                {/* Sidebar */}
                <div className="w-1/3 bg-gray-800 text-white p-6 flex flex-col">
                    <div className="mb-8 text-center">
                        {personalInfo.photoUrl && (
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-white mb-4">
                                <img src={personalInfo.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <h1 className="text-2xl font-bold leading-tight mb-2">{personalInfo.fullName}</h1>
                        {personalInfo.title && <p className="text-blue-300 text-sm font-medium uppercase tracking-wider">{personalInfo.title}</p>}
                    </div>

                    <div className="space-y-4 text-sm mb-8">
                        <div className="font-semibold uppercase text-gray-400 text-xs tracking-wider mb-2">Contato</div>
                        {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={12}/> {personalInfo.address}</div>}
                        {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12}/> {personalInfo.phone}</div>}
                        {personalInfo.email && <div className="flex items-center gap-2 break-all"><Mail size={12}/> {personalInfo.email}</div>}
                        {personalInfo.linkedin && <div className="flex items-center gap-2 break-all"><Linkedin size={12}/> {personalInfo.linkedin}</div>}
                    </div>

                    {/* Skills in sidebar for Minimal template if exists */}
                    {sections.filter(s => s.type === 'skills').map(section => (
                        <div key={section.id} className="mt-6">
                            <div className="font-semibold uppercase text-gray-400 text-xs tracking-wider mb-3">{section.title}</div>
                            <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                                 {section.items.map(item => (
                                    <li key={item.id}>{item.description || item.title}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="w-2/3 p-8 bg-white">
                    {personalInfo.summary && (
                        <div className="mb-8">
                            <h3 className="text-gray-800 font-bold uppercase tracking-widest text-sm mb-4 border-b pb-2">Perfil</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
                        </div>
                    )}

                    {sections.filter(s => s.type !== 'skills').map(section => (
                         <div key={section.id} className="mb-8">
                            <h3 className="text-gray-800 font-bold uppercase tracking-widest text-sm mb-4 border-b pb-2">{section.title}</h3>
                            <div className="space-y-4">
                                {section.items.map((item) => (
                                    <div key={item.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                                            <span className="text-xs text-gray-500">{item.date}</span>
                                        </div>
                                        <div className="text-xs font-semibold text-blue-600 mb-2 uppercase">{item.subtitle}</div>
                                        <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                         </div>
                    ))}
                </div>
           </div>
        </div>
    );
  }

  // --- TEMPLATE: CLASSIC (Simple Top-Down) ---
  return (
    <div id={id} className="print-area w-full bg-white text-gray-900 overflow-hidden relative" style={{ height: 'auto' }}>
       <div style={scaleStyle} className="p-10">
            <header className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
                {personalInfo.title && <p className="text-lg text-gray-600 mb-4">{personalInfo.title}</p>}
                
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {personalInfo.address && <span>{personalInfo.address}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.email && <span>• {personalInfo.email}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                </div>
            </header>

            <div className="space-y-6">
                {personalInfo.summary && (
                    <section>
                        <h3 className="text-lg font-bold uppercase text-gray-800 border-b border-gray-300 mb-3 pb-1">Resumo</h3>
                        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                    </section>
                )}

                {sections.map(section => (
                    <section key={section.id}>
                        <h3 className="text-lg font-bold uppercase text-gray-800 border-b border-gray-300 mb-4 pb-1">{section.title}</h3>
                        {section.type === 'skills' ? (
                            <div className="grid grid-cols-2 gap-2">
                                 {section.items.map(item => (
                                    <div key={item.id} className="flex items-center">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                                        <span>{item.description || item.title}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {section.items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 gap-4">
                                        <div className="col-span-3 text-sm text-gray-500 font-medium pt-1">
                                            {item.date}
                                        </div>
                                        <div className="col-span-9">
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <div className="text-gray-700 font-medium italic mb-1">{item.subtitle}</div>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                ))}
            </div>
       </div>
    </div>
  );
};