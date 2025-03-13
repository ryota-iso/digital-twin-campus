import { useState } from 'react'
import { css } from '@/styled-system/css'
import { vstack } from '@/styled-system/patterns'
import { IconButton } from './IconButton'
import { InputForm } from './InputForm'

// SVG
import paperAirplaneSvg from '@/src/assets/paperAirplane.svg'
import noSymbolSvg from '@/src/assets/noSymbol.svg'
import chatSvg from '@/src/assets/chat.svg'

type chatHistory = {
  sender: 'me' | 'bot'
  text: string
  order?: any
}

export default function Chat({ setIsDescriptions, setIsFilterInfo, setMapDescription }: any) {
  const [chatText, setChatText] = useState('')
  const [chatHistory, setChatHistory] = useState<chatHistory[]>([])
  const [chatState, setChatState] = useState<'sendable' | 'waiting'>('sendable')

  // チャットテキストの同期
  const handleChatTextChange = (e: any) => {
    setChatText(e.target.value)
  }

  // チャット送信
  const handleChatSend = async () => {
    if (chatText === '') return

    // チャット履歴に追加
    setChatHistory([
      ...chatHistory,
      {
        sender: 'me',
        text: chatText,
      },
    ])
    // チャットテキストをクリア
    setChatText('')
    // チャットの状態をwaitingに変更
    setChatState('waiting')
    // ルートマップを非表示にする
    setIsDescriptions(false)
    // フィルタ情報を非表示にする
    setIsFilterInfo(false)
    // マップの情報をクリアする
    setMapDescription([])

    const order = await (async function () {
      const response = await fetch('http://localhost:4000/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatMessage: chatText, currentLocation: 'kappa' }),
      })

      return response.json()
    })()

    console.log(order)

    if (order.type === 'getRouteMap') {
      setIsDescriptions(true)
    }

    if (order.type === 'listMapInfo') {
      setIsFilterInfo(true)
      setMapDescription(order.courses)
    }

    if (order.type === 'UnknownOrder') {
      alert('指示の意図が理解できませんでした。')
    }
  }

  return (
    <div
      className={vstack({
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 16,
      })}>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 480,
        })}>
        <IconButton assetPath={chatSvg} buttonName="履歴" marginPosition="right" theme="white" />
        <InputForm value={chatText} onChange={handleChatTextChange} />
        <IconButton
          assetPath={chatState === 'sendable' ? paperAirplaneSvg : noSymbolSvg}
          buttonName={chatState === 'sendable' ? '送信' : '受信待ち'}
          marginPosition="left"
          disabled={chatState === 'waiting'}
          onClick={handleChatSend}
        />
      </div>
    </div>
  )
}
