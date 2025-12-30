import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Section, SectionItem } from '../types';
import { GripVertical, Trash2, Plus, ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { Button } from './ui/Button';

interface SortableSectionListProps {
  sections: Section[];
  onReorder: (sections: Section[]) => void;
  onUpdateSection: (id: string, updatedSection: Section) => void;
  onRemoveSection: (id: string) => void;
  onAddSection: () => void;
}

export const SortableSectionList: React.FC<SortableSectionListProps> = ({
  sections,
  onReorder,
  onUpdateSection,
  onRemoveSection,
  onAddSection
}) => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorder(items);
  };

  const toggleExpand = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const handleAddItemToSection = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    const newItem: SectionItem = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      date: '',
      description: ''
    };
    const updatedSection = { ...section, items: [...section.items, newItem] };
    onUpdateSection(section.id, updatedSection);
  };

  const handleUpdateItem = (sectionIndex: number, itemIndex: number, field: keyof SectionItem, value: string) => {
    const section = sections[sectionIndex];
    const newItems = [...section.items];
    newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
    onUpdateSection(section.id, { ...section, items: newItems });
  };

  const handleRemoveItem = (sectionIndex: number, itemIndex: number) => {
    const section = sections[sectionIndex];
    const newItems = section.items.filter((_, idx) => idx !== itemIndex);
    onUpdateSection(section.id, { ...section, items: newItems });
  };

  const handleTitleChange = (sectionIndex: number, newTitle: string) => {
    const section = sections[sectionIndex];
    onUpdateSection(section.id, { ...section, title: newTitle });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Seções do Currículo</h3>
        <Button onClick={onAddSection} size="sm" variant="secondary">
          <Plus size={16} className="mr-2" /> Nova Seção
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      {/* Header of the Card */}
                      <div className="flex items-center p-3 bg-gray-50">
                        <div {...provided.dragHandleProps} className="mr-3 cursor-move text-gray-400 hover:text-gray-600">
                          <GripVertical size={20} />
                        </div>
                        
                        <div className="flex-1">
                          <input 
                            value={section.title}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            className="bg-transparent font-medium text-gray-800 focus:outline-none focus:border-b border-blue-500 w-full"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                           <button 
                            onClick={() => toggleExpand(section.id)}
                            className="p-1 hover:bg-gray-200 rounded text-gray-500"
                          >
                            {expandedSection === section.id ? <ChevronUp size={18} /> : <Edit2 size={16} />}
                          </button>
                          <button 
                            onClick={() => onRemoveSection(section.id)}
                            className="p-1 hover:bg-red-100 text-red-500 rounded"
                            title="Remover Seção"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Content of the Card (Expandable) */}
                      {expandedSection === section.id && (
                        <div className="p-4 border-t border-gray-100 bg-white">
                          <div className="space-y-4">
                            {section.items.map((item, itemIdx) => (
                              <div key={item.id} className="p-3 border rounded-md relative group bg-gray-50/50">
                                <button
                                  onClick={() => handleRemoveItem(index, itemIdx)}
                                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={16} />
                                </button>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                                    {section.type !== 'skills' && (
                                      <input
                                        placeholder={section.type === 'education' ? 'Instituição' : 'Empresa / Título'}
                                        value={item.title}
                                        onChange={(e) => handleUpdateItem(index, itemIdx, 'title', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm w-full"
                                      />
                                    )}
                                    {section.type !== 'skills' && (
                                      <input
                                        placeholder={section.type === 'education' ? 'Curso / Grau' : 'Cargo / Subtítulo'}
                                        value={item.subtitle}
                                        onChange={(e) => handleUpdateItem(index, itemIdx, 'subtitle', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm w-full"
                                      />
                                    )}
                                    
                                     {section.type === 'skills' && (
                                      <input
                                        placeholder="Habilidade (ex: React, Liderança)"
                                        value={item.description} // Using description field for simple skill text
                                        onChange={(e) => handleUpdateItem(index, itemIdx, 'description', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm w-full col-span-2"
                                      />
                                    )}
                                </div>
                                
                                {section.type !== 'skills' && (
                                  <>
                                    <input
                                        placeholder="Período (ex: 2020 - 2022)"
                                        value={item.date}
                                        onChange={(e) => handleUpdateItem(index, itemIdx, 'date', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm w-full mb-2"
                                    />
                                    <textarea
                                        placeholder="Descrição das atividades..."
                                        value={item.description}
                                        onChange={(e) => handleUpdateItem(index, itemIdx, 'description', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm w-full h-20 resize-y"
                                    />
                                  </>
                                )}
                              </div>
                            ))}
                            
                            <Button onClick={() => handleAddItemToSection(index)} variant="ghost" size="sm" className="w-full border border-dashed border-gray-300 text-gray-500">
                              <Plus size={16} className="mr-2" /> Adicionar Item
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};