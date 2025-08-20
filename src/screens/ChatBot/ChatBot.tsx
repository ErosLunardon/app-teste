import React, { useState } from 'react';
import { useChatCompletion } from './hooks/ChatBot';
import {
    Modal,
    View,
    Pressable,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Input } from '../../components/ui_lib/ui/input';
import { Text } from '../../components/ui_lib/ui/text';
import { IconButton } from '../../components/buttons/IconButton';
import { MenuButton } from '../../components/buttons/MenuButton';
import { Avatar } from '../../components/ui_lib/ui/avatar';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
};

type FAQOption = {
    question: string;
    answer: string;
};


type ChatBotProps = {
    faqOptions?: FAQOption[];
    buttonLabel?: string;
};


const ChatBot: React.FC<ChatBotProps> = ({ faqOptions = [], buttonLabel = '💬' }) => {
    const [input, setInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [showFaq, setShowFaq] = useState(true);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Olá, como posso te ajudar?', sender: 'bot' }
    ]);
    const { sendMessage } = useChatCompletion();

    const handleSend = async (text: string) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
        };
        setMessages((prev) => [...prev, userMsg]);

        const faqItem = faqOptions.find(faq => faq.question === text);
        let botReply: string;
        if (faqItem) {
            botReply = faqItem.answer;
        } else {
            botReply = await sendMessage(text);
        }
        const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: botReply,
            sender: 'bot',
        };
        setMessages((prev) => [...prev, botMsg]);
    };

    const handleSubmit = () => {
        const trimmed = input.trim();
        if (trimmed) {
            handleSend(trimmed);
            setInput('');
        }
    };

    const handleFaqClick = (faq: FAQOption) => {
        handleSend(faq.question);
    };

    return (
        <>
            {!visible && (
                <View style={styles.floatingButtonContainer}>
                    <IconButton
                        name="chat"
                        onPress={() => setVisible(true)}
                        lightColor="#0A84FF"
                        darkColor="#0A84FF"
                        style={styles.floatingButton}
                    />
                </View>
            )}

            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.overlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={styles.modal}
                    >
                        <View style={styles.headerRow}>
                            <MenuButton />
                            <Text className="font-bold text-xl text-[#003366] flex-1 text-center">ChatBot</Text>
                            {faqOptions.length > 0 && (
                                <IconButton
                                    name={showFaq ? 'remove' : 'add'}
                                    onPress={() => setShowFaq((prev) => !prev)}
                                    style={styles.faqClose}
                                    lightColor="#0070D1"
                                    darkColor="#0070D1"
                                />
                            )}
                        </View>

                        {faqOptions.length > 0 && showFaq && (
                            <View style={styles.faqContainer}>
                                {faqOptions.map((faq, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.faqBubble}
                                        onPress={() => handleFaqClick(faq)}
                                    >
                                        <Text className="text-[#003366] text-[15px] font-medium tracking-[0.2px]">{faq.question}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <FlatList
                            data={messages}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.chatArea}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: item.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', marginBottom: 8 }}>
                                    {item.sender === 'bot' && (
                                        <Avatar style={{ marginRight: 8 }} alt="Bot" />
                                    )}
                                    <View
                                        style={[
                                            styles.messageBubble,
                                            item.sender === 'user'
                                                ? styles.userMessage
                                                : { ...styles.botMessage, alignSelf: 'flex-start', marginLeft: 0 }
                                        ]}
                                    >
                                        <Text className="text-white text-[14px]">{item.text}</Text>
                                    </View>
                                </View>
                            )}
                        />

                        <View style={styles.inputContainer}>
                            <Input
                                placeholder="Digite sua mensagem..."
                                value={input}
                                onChangeText={setInput}
                                onSubmitEditing={handleSubmit}
                                className="text-[#003366] text-[14px]"
                                returnKeyType="send"
                            />
                        </View>

                        <Pressable onPress={() => setVisible(false)} style={styles.closeButton}>
                            <Text className="text-[#0070D1] font-bold">Fechar</Text>
                        </Pressable>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </>
    );
};

export default ChatBot;

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: '#E6F0FB',
        padding: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 12,
        borderBottomColor: '#0070D1',
        borderBottomWidth: 2,
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#003366',
        flex: 1,
        textAlign: 'center',
    },
    chatArea: {
        flexGrow: 1,
        paddingVertical: 8,
        gap: 10,
    },
    messageBubble: {
        maxWidth: '75%',
        padding: 12,
        borderRadius: 16,
    },
    userMessage: {
        backgroundColor: '#2121a8ff',
        alignSelf: 'flex-end',
        borderTopRightRadius: 0,
    },
    botMessage: {
        backgroundColor: '#0070D1',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 0,
    },
    messageText: {
        color: '#ffffff',
        fontSize: 14,
    },
    inputContainer: {
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#0070D1',
    },
    input: {
        color: '#003366',
        fontSize: 14,
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    closeText: {
        color: '#0070D1',
        fontWeight: 'bold',
    },
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        zIndex: 10,
    },
    floatingButton: {
        backgroundColor: '#0A84FF',
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    faqContainer: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    faqBubble: {
        backgroundColor: '#F5F7FA',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 20,
        margin: 6,
        borderWidth: 1,
        borderColor: '#0070D1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    faqText: {
        color: '#003366',
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    faqClose: {
        padding: 8,
        zIndex: 2,
    },
});
