import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBuildStore = create(
    persist(
        (set, get) => ({
            selectedCharacter: null,
            currentLevel: 1,
            targetLevel: 60,
            inventory: {},

            setSelectedCharacter: (character) => set({ selectedCharacter: character }),
            setCurrentLevel: (level) => set({ currentLevel: Math.max(1, Math.min(60, level)) }),
            setTargetLevel: (level) => set({ targetLevel: Math.max(1, Math.min(60, level)) }),

            updateInventory: (materialId, quantity) => 
                set((state) => ({
                    inventory: {
                        ...state.inventory,
                        [materialId]: Math.max(0, quantity)
                    }
                })),

            selectedTeam: [null, null, null],
            selectedBangboo: null,

            setTeamSlot: (index, character) =>
                set((state) => {
                const newTeam = [...state.selectedTeam];
                newTeam[index] = character;
                return { selectedTeam: newTeam };
                }),
            
            setSelectedBangboo: (bangboo) => set({ selectedBangboo: bangboo }),
            
            // Reset functions
            resetBuildPlanner: () => set({
                selectedCharacter: null,
                currentLevel: 1,
                targetLevel: 60,
            }),
            
            resetTeamPlanner: () => set({
                selectedTeam: [null, null, null],
                selectedBangboo: null,
            }),
        }),
        {
            name: "build-planner-storage",
        }
    )
);