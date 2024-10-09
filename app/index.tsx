// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import { Stack } from 'expo-router';
// import { useState } from 'react';
// import React = require('react');
// import { Text, View, TextInput, FlatList } from 'react-native';

// import { languages } from '~/assets/languages';
// import AudioRecording from '~/components/AudioRecording';
// import { translate, textToSpeech, audioToText } from '~/utils/translation';

// export default function Home() {
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [languageFrom, setLanguageFrom] = useState('English');
//   const [languageTo, setLanguageTo] = useState('Spanish');
//   const [selectLanguageMode, setSelectLanguageMode] = useState<'from' | 'to' | null>(null);

//   const onTranslate = async () => {
//     const translation = await translate(input, languageFrom, languageTo);
//     setOutput(translation);
//   };

//   const speechToText = async (uri: string) => {
//     const text = await audioToText(uri);
//     setInput(text);
//     const translation = await translate(text, languageFrom, languageTo);
//     setOutput(translation);
//   };

//   if (selectLanguageMode) {
//     return (
//       <FlatList
//         data={languages}
//         renderItem={({ item }) => (
//           <Text
//             onPress={() => {
//               if (selectLanguageMode === 'from') {
//                 setLanguageFrom(item.name);
//               } else {
//                 setLanguageTo(item.name);
//               }
//               setSelectLanguageMode(null);
//             }}
//             className="p-2 px-5">
//             {item.name}
//           </Text>
//         )}
//       />
//     );
//   }

//   return (
//     <View className="mx-auto w-full max-w-xl">
//       <Stack.Screen options={{ title: 'Translate' }} />

//       {/* Language selector row */}
//       <View className="flex-row justify-around p-5">
//         <Text
//           onPress={() => setSelectLanguageMode('from')}
//           className="font-semibold color-blue-600">
//           {languageFrom}
//         </Text>
//         <FontAwesome5
//           onPress={() => {
//             setLanguageFrom(languageTo);
//             setLanguageTo(languageFrom);
//           }}
//           name="exchange-alt"
//           size={16}
//           color="gray"
//         />
//         <Text onPress={() => setSelectLanguageMode('to')} className="font-semibold color-blue-600">
//           {languageTo}
//         </Text>
//       </View>

//       {/* Input container */}
//       <View className="border-y border-gray-300 p-5">
//         <View className="flex-row gap-5">
//           {/* input */}
//           <TextInput
//             value={input}
//             onChangeText={setInput}
//             placeholder="Enter your text"
//             className="min-h-32 flex-1 text-xl"
//             multiline
//             maxLength={5000}
//           />
//           {/* send button */}
//           <FontAwesome6
//             onPress={onTranslate}
//             name="circle-arrow-right"
//             size={24}
//             color="royalblue"
//           />
//         </View>
//         <View className="flex-row justify-between">
//           <AudioRecording onNewRecording={(uri) => speechToText(uri)} />

//           <Text className="color-gray-500">{input.length} / 5000</Text>
//         </View>
//       </View>

//       {/* Output container */}
//       {output && (
//         <View className="gap-5 bg-gray-200 p-5">
//           <Text className="min-h-32 text-xl">{output}</Text>
//           <View className="flex-row justify-between">
//             <FontAwesome6
//               onPress={() => textToSpeech(output)}
//               name="volume-high"
//               size={18}
//               color="dimgray"
//             />
//             <FontAwesome5 name="copy" size={18} color="dimgray" />
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Stack } from 'expo-router';
import { useState } from 'react';
import React from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';

import { languages } from '~/assets/languages';
import AudioRecording from '~/components/AudioRecording';
import { translate, textToSpeech, audioToText } from '~/utils/translation';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [languageFrom, setLanguageFrom] = useState('English');
  const [languageTo, setLanguageTo] = useState('Spanish');
  const [selectLanguageMode, setSelectLanguageMode] = useState<'from' | 'to' | null>(null);

  const onTranslate = async () => {
    try {
      const translation = await translate(input, languageFrom, languageTo);
      setOutput(translation);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const speechToText = async (uri: string) => {
    try {
      const text = await audioToText(uri);
      setInput(text);
      await onTranslate(); // Call translate after capturing audio
    } catch (error) {
      console.error("Speech to text error:", error);
    }
  };

  if (selectLanguageMode) {
    return (
      <FlatList
        data={languages}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (selectLanguageMode === 'from') {
                setLanguageFrom(item.name);
              } else {
                setLanguageTo(item.name);
              }
              setSelectLanguageMode(null);
            }}
            style={{ padding: 10 }}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <View style={{ margin: 'auto', width: '100%', maxWidth: 400 }}>
      <Stack.Screen options={{ title: 'Translate' }} />

      {/* Language selector row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20 }}>
        <TouchableOpacity onPress={() => setSelectLanguageMode('from')}>
          <Text style={{ fontWeight: '600', color: 'blue' }}>{languageFrom}</Text>
        </TouchableOpacity>
        <FontAwesome5
          onPress={() => {
            setLanguageFrom(languageTo);
            setLanguageTo(languageFrom);
          }}
          name="exchange-alt"
          size={16}
          color="gray"
        />
        <TouchableOpacity onPress={() => setSelectLanguageMode('to')}>
          <Text style={{ fontWeight: '600', color: 'blue' }}>{languageTo}</Text>
        </TouchableOpacity>
      </View>

      {/* Input container */}
      <View style={{ borderTopWidth: 1, borderBottomWidth: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter your text"
            style={{ minHeight: 80, flex: 1, fontSize: 20 }}
            multiline
            maxLength={5000}
          />
          <FontAwesome6
            onPress={onTranslate}
            name="circle-arrow-right"
            size={24}
            color="royalblue"
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AudioRecording onNewRecording={speechToText} />
          <Text style={{ color: 'gray' }}>{input.length} / 5000</Text>
        </View>
      </View>

      {/* Output container */}
      {output && (
        <View style={{ gap: 10, backgroundColor: '#E5E5E5', padding: 20 }}>
          <Text style={{ minHeight: 80, fontSize: 20 }}>{output}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <FontAwesome6
              onPress={() => textToSpeech(output)}
              name="volume-high"
              size={18}
              color="dimgray"
            />
            <FontAwesome5 name="copy" size={18} color="dimgray" />
          </View>
        </View>
      )}
    </View>
  );
}