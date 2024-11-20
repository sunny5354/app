import { View } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'

const SkeletonProductCard: React.FC = () => {
    return (
        <View className="px-3 pt-2 bg-primaryCreamLight my-2 rounded-lg">
            <View className="flex-row py-2" style={{ gap: 10 }}>
                <View className="" style={{gap:10}}>
                    <MotiView
                        from={{ opacity: 0.2 }}
                        animate={{ opacity: 0.6 }}
                        transition={{
                            loop: true,
                            type: "timing",
                            duration: 1000,
                        }}
                        className="w-[110px] h-32 bg-slate-300 rounded-xl animate-pulse"
                    />
                    <MotiView
                        from={{ opacity: 0.2 }}
                        animate={{ opacity: 0.6 }}
                        transition={{
                            loop: true,
                            type: "timing",
                            duration: 1000,
                        }}
                        className="w-full h-3 bg-slate-300 rounded-sm animate-pulse"
                    />
                </View>
                <View className="flex-1 w-full" style={{ gap: 5 }}>
                    <View style={{ gap: 10 }}>
                        <MotiView
                            from={{ opacity: 0.2 }}
                            animate={{ opacity: 0.6 }}
                            transition={{
                                loop: true,
                                type: "timing",
                                duration: 1000,
                            }}
                            className="w-full h-4 bg-slate-300 rounded-sm animate-pulse"
                        />
                        <MotiView
                            from={{ opacity: 0.2 }}
                            animate={{ opacity: 0.6 }}
                            transition={{
                                loop: true,
                                type: "timing",
                                duration: 1000,
                            }}
                            className="w-full h-4 bg-slate-300 rounded-sm animate-pulse"
                        />
                        <MotiView
                            from={{ opacity: 0.2 }}
                            animate={{ opacity: 0.6 }}
                            transition={{
                                loop: true,
                                type: "timing",
                                duration: 1000,
                            }}
                            className="w-full h-4 bg-slate-300 rounded-sm animate-pulse"
                        />
                        <MotiView
                            from={{ opacity: 0.2 }}
                            animate={{ opacity: 0.6 }}
                            transition={{
                                loop: true,
                                type: "timing",
                                duration: 1000,
                            }}
                            className="w-full h-6 bg-slate-300 rounded-sm animate-pulse"
                        />
                        <MotiView
                            from={{ opacity: 0.2 }}
                            animate={{ opacity: 0.6 }}
                            transition={{
                                loop: true,
                                type: "timing",
                                duration: 1000,
                            }}
                            className="w-full h-6 bg-slate-300 rounded-sm animate-pulse"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SkeletonProductCard
