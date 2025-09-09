import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Home: undefined;
  Segunda: undefined;
  Terceira: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tasks, setTasks] = useState<string[]>([]);
  const [doneTasks, setDoneTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const hoje = new Date();
  const dataFormatada = `${hoje.getDate().toString().padStart(2, "0")}/${
    (hoje.getMonth() + 1).toString().padStart(2, "0")
  }/${hoje.getFullYear()}`;

  // 🔹 Carregar tarefas salvas ao abrir o app
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        const savedDoneTasks = await AsyncStorage.getItem("doneTasks");

        if (savedTasks) setTasks(JSON.parse(savedTasks));
        if (savedDoneTasks) setDoneTasks(JSON.parse(savedDoneTasks));
      } catch (error) {
        console.log("Erro ao carregar tarefas:", error);
      }
    };
    loadTasks();
  }, []);

  // 🔹 Salvar no AsyncStorage sempre que mudar
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
        await AsyncStorage.setItem("doneTasks", JSON.stringify(doneTasks));
      } catch (error) {
        console.log("Erro ao salvar tarefas:", error);
      }
    };
    saveTasks();
  }, [tasks, doneTasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  const completeTask = (index: number) => {
    const task = tasks[index];
    setDoneTasks([...doneTasks, task]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const deleteTask = (index: number, isDone = false) => {
    if (isDone) {
      setDoneTasks(doneTasks.filter((_, i) => i !== index));
    } else {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  return (
    <LinearGradient colors={["#800080", "#000000"]} style={styles.container}>
      <Text style={styles.date}>Minhas Tarefas - {dataFormatada}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="+" onPress={addTask} />
      </View>

      {/* 🔹 Duas colunas: Pendentes | Concluídas */}
      <View style={styles.taskColumns}>
        {/* Tarefas pendentes */}
        <View style={styles.taskColumn}>
          <Text style={styles.columnTitle}>📌 Pendentes</Text>
          <FlatList
            data={tasks}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => completeTask(index)}
                  style={styles.completeButton}
                >
                  <Text style={styles.completeText}>✅</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteTask(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Tarefas concluídas */}
        <View style={styles.taskColumn}>
          <Text style={styles.columnTitle}>🎉 Concluídas</Text>
          <FlatList
            data={doneTasks}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <Text style={[styles.taskText, { textDecorationLine: "line-through", color: "lightgreen" }]}>
                  {item}
                </Text>
                <TouchableOpacity
                  onPress={() => deleteTask(index, true)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>

      <View style={styles.navButtons}>
        <Button title="➡️Ir para Segunda" onPress={() => navigation.navigate("Segunda")} />
        <Button title="➡️Ir para Terceira" onPress={() => navigation.navigate("Terceira")} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  taskColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  taskColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "white",
  },
  completeButton: {
    marginRight: 10,
  },
  completeText: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
  navButtons: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
