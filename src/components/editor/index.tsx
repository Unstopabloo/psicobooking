"use client"

import {
  useEditor,
  BubbleMenu,
  EditorContent
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '../ui/button'
import { BoldIcon, Heading3, Highlighter, ItalicIcon, List, ListOrdered, Quote, Strikethrough, UnderlineIcon } from 'lucide-react'
import { Heading2 } from 'lucide-react'

import { useQueryState, parseAsInteger } from "nuqs"
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'

import Heading from '@tiptap/extension-heading'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'

import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'

import Blockquote from '@tiptap/extension-blockquote'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { toast } from 'sonner'
import { createClinicalHistory } from '@/server/actions/users'
import { useRouter } from 'next/navigation'

export function Editor({ defaultValue, currentPatientId }: { defaultValue: string, currentPatientId: string }) {
  const [historial] = useQueryState('historial', parseAsInteger)
  const router = useRouter()
  const limit = 3500
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert rounded-xl p-4 w-full focus:outline-none lg:min-h-[350px] lg:max-h-[350px] 2xl:min-h-[490px] 2xl:max-h-[490px] overflow-y-auto'
      }
    },
    extensions: [
      StarterKit,
      Document,
      Text,
      Paragraph,
      Bold,
      Italic,
      Highlight,
      Underline,
      Blockquote,
      ListItem,
      BulletList,
      OrderedList,
      CharacterCount.configure({
        limit
      }),
      Heading.configure({
        levels: [2, 3]
      }),
      Placeholder.configure({
        placeholder: 'Escribe algo...',
      }),
    ],
    content: defaultValue.replace(/^"|"$/g, '').trim()
  }, [defaultValue])

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0

  const handleSave = async () => {
    if (!editor) return
    const $h2 = editor.$node('heading', { level: 2 })?.element.textContent
    const html = editor?.getHTML()

    if (editor.isEmpty) {
      toast.warning('No se puede guardar un historial clinico vacio, porfavor escribe algo incluyendo un titulo')
      return
    }

    if (!$h2) {
      toast.warning('No se puede guardar un historial clinico sin titulo, porfavor incluye uno')
      return
    }

    const clinicalHistory = {
      id: historial ? historial : undefined,
      patient_id: parseInt(currentPatientId), // Asegúrate de tener esta variable definida
      title: $h2,
      content: html
    }

    toast.promise(createClinicalHistory(clinicalHistory), {
      loading: 'Guardando historial clinico...',
      success: 'Historial clinico guardado con exito',
      error: 'Ha ocurrido un error inesperado'
    })

    router.refresh()
  }

  const SlotBefore = () => {
    return (
      <ul className='flex items-center gap-4 py-2 px-0 mx-0 border-b max-w-[700px]'>
        <li className='flex items-center gap-3 h-full'>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor?.isActive('heading', { level: 2 }) ? 'bg-primary/20 border border-primary' : ''}
          >
            <Heading2 size={16} />
          </Button>
          <Button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor?.isActive('heading', { level: 3 }) ? 'bg-primary/20 border border-primary' : ''}
            variant='ghost'
          >
            <Heading3 size={16} />
          </Button>
        </li>

        <li className='flex items-center gap-1 h-full'>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive('bold') ? 'bg-primary/20 border border-primary' : ''}
          >
            <BoldIcon size={16} />
          </Button>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive('italic') ? 'bg-primary/20 border border-primary' : ''}
          >
            <ItalicIcon size={16} />
          </Button>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={editor?.isActive('underline') ? 'bg-primary/20 border border-primary' : ''}
          >
            <UnderlineIcon size={16} />
          </Button>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleHighlight().run()}
            className={editor?.isActive('highlight') ? 'bg-primary/20 border border-primary' : ''}
          >
            <Highlighter size={16} />
          </Button>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={editor?.isActive('strike') ? 'bg-primary/20 border border-primary' : ''}
          >
            <Strikethrough size={16} />
          </Button>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={editor?.isActive('blockquote') ? 'bg-primary/20 border border-primary' : ''}
          >
            <Quote size={16} />
          </Button>
        </li>

        <li className='flex items-center gap-1 h-full'>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={editor?.isActive('bulletList') ? 'bg-primary/20 border border-primary' : ''}
          >
            <List size={16} />
          </Button>
          <Button
            variant='ghost'
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={editor?.isActive('orderedList') ? 'bg-primary/20 border border-primary' : ''}
          >
            <ListOrdered size={16} />
          </Button>
        </li>

      </ul>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <ul className='flex items-center gap-4 p-1 mx-0 bg-background border border-black dark:border-border rounded-md text-foreground'>
          <li className='flex items-center gap-1 h-full'>
            <Button
              variant='ghost'
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor?.isActive('heading', { level: 2 }) ? 'bg-primary/20 border border-primary' : ''}
            >
              <Heading2 size={16} />
            </Button>
            <Button
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor?.isActive('heading', { level: 3 }) ? 'bg-primary/20 border border-primary' : ''}
              variant='ghost'
            >
              <Heading3 size={16} />
            </Button>
            <Button
              variant='ghost'
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive('bold') ? 'bg-primary/20 border border-primary' : ''}
            >
              <BoldIcon size={16} />
            </Button>
            <Button
              variant='ghost'
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive('italic') ? 'bg-background text-background-foreground border' : ''}
            >
              <ItalicIcon size={16} />
            </Button>
            <Button
              variant='ghost'
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={editor?.isActive('underline') ? 'bg-primary/20 border border-primary' : ''}
            >
              <UnderlineIcon size={16} />
            </Button>
            <Button
              variant='ghost'
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              className={editor?.isActive('highlight') ? 'bg-primary/20 border border-primary' : ''}
            >
              <Highlighter size={16} />
            </Button>
          </li>
        </ul>
      </BubbleMenu>}
      <SlotBefore />
      <EditorContent editor={editor} />
      <div className="flex items-center justify-between">
        {editor
          && <div className={`flex items-center gap-2 py-4 text-foreground/90 text-xs ${editor.storage.characterCount.characters() === limit ? 'text-red-400' : ''}`}>
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
            >
              <circle
                r="10"
                cx="10"
                cy="10"
                fill="#e9ecef"
              />
              <circle
                r="5"
                cx="10"
                cy="10"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                transform="rotate(-90) translate(-20)"
              />
              <circle
                r="6"
                cx="10"
                cy="10"
                fill="white"
              />
            </svg>

            {editor.storage.characterCount.characters()} / {limit} caracteres
          </div>
        }
        <Button onClick={handleSave} className='min-w-72'>Guardar</Button>
      </div>
    </div>
  )
}